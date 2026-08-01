alter table public.questions
  add column if not exists question_id text,
  add column if not exists question_type text,
  add column if not exists paper_code text,
  add column if not exists question_no integer,
  add column if not exists question text,
  add column if not exists options jsonb,
  add column if not exists correct_answer text,
  add column if not exists subject text,
  add column if not exists year integer,
  add column if not exists branch text,
  add column if not exists topic text,
  add column if not exists needs_review boolean default false,
  add column if not exists is_verified boolean default true;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'questions'
      and column_name = 'answer'
  ) then
    execute 'update public.questions set correct_answer = coalesce(correct_answer, answer::text)';
  end if;
end $$;

with ranked as (
  select
    ctid,
    row_number() over (
      partition by paper_code, question_no
      order by is_verified desc nulls last, needs_review asc nulls last, id desc
    ) as duplicate_rank
  from public.questions
  where paper_code is not null
    and question_no is not null
)
delete from public.questions q
using ranked r
where q.ctid = r.ctid
  and r.duplicate_rank > 1;

create unique index if not exists questions_paper_code_question_no_key
  on public.questions (paper_code, question_no)
  where paper_code is not null
    and question_no is not null;
