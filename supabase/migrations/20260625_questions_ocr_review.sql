alter table public.questions
  add column if not exists raw_ocr_text text,
  add column if not exists image_path text,
  add column if not exists needs_review boolean default true,
  add column if not exists is_verified boolean default false,
  add column if not exists question_text text,
  add column if not exists option_a text,
  add column if not exists option_b text,
  add column if not exists option_c text,
  add column if not exists option_d text,
  add column if not exists correct_answer text;
