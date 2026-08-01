import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * SEO component updates HTML document metadata and injects JSON-LD schema dynamically.
 * Helps search engines index pages correctly and provides metadata for social sharing previews.
 */
function SEO({
  title = "ECET Rankers | TS ECET Previous Papers, Mock Tests & Practice Questions",
  description = "Access TS ECET mock tests, previous year papers, and topic-wise practice questions. Prepare for CSE, ECE, EEE, Civil, and Mechanical Engineering ECET exams.",
  keywords = "TS ECET, ECET Rankers, ECET Mock Tests, ECET Previous Papers, ECET Practice Questions, CSE ECET, ECE ECET, EEE ECET, Civil ECET, Mechanical ECET, Diploma Entrance Exam",
  canonicalUrl,
  ogType = "website",
  ogImage = "/launch-poster.png",
  schema,
  robots = "index, follow"
}) {
  const location = useLocation()
  
  // Resolve standard domain URL dynamically
  const siteUrl = "https://ecetrankers.in"
  const currentUrl = canonicalUrl || `${siteUrl}${location.pathname}`

  useEffect(() => {
    // 1. Update document title
    document.title = title

    // Helper function to update or create meta tags
    const updateOrCreateMeta = (nameOrProperty, value, isProperty = false) => {
      const selector = isProperty 
        ? `meta[property="${nameOrProperty}"]` 
        : `meta[name="${nameOrProperty}"]`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement("meta")
        if (isProperty) {
          el.setAttribute("property", nameOrProperty)
        } else {
          el.setAttribute("name", nameOrProperty)
        }
        document.head.appendChild(el)
      }
      el.setAttribute("content", value)
    }

    // 2. Standard Meta Tags
    updateOrCreateMeta("description", description)
    updateOrCreateMeta("keywords", keywords)
    updateOrCreateMeta("robots", robots)

    // 3. Open Graph Tags (Facebook, WhatsApp, LinkedIn, Instagram, etc.)
    updateOrCreateMeta("og:title", title, true)
    updateOrCreateMeta("og:description", description, true)
    updateOrCreateMeta("og:url", currentUrl, true)
    updateOrCreateMeta("og:type", ogType, true)
    updateOrCreateMeta("og:image", ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`, true)
    updateOrCreateMeta("og:site_name", "ECET Rankers", true)

    // 4. Twitter Card Tags
    updateOrCreateMeta("twitter:card", "summary_large_image")
    updateOrCreateMeta("twitter:title", title)
    updateOrCreateMeta("twitter:description", description)
    updateOrCreateMeta("twitter:image", ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`)

    // 5. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement("link")
      canonicalLink.setAttribute("rel", "canonical")
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute("href", currentUrl)

    // 6. JSON-LD Schemas injection
    const defaultSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "name": "ECET Rankers",
        "url": siteUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/practice?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": ["Organization", "EducationalOrganization"],
        "@id": `${siteUrl}/#organization`,
        "name": "ECET Rankers",
        "url": siteUrl,
        "logo": `${siteUrl}/favicon.svg`,
        "description": "ECET Rankers is India's leading exam preparation platform for Diploma students preparing for the Engineering Common Entrance Test (ECET).",
        "sameAs": [
          "https://facebook.com/ecetrankers",
          "https://twitter.com/ecetrankers",
          "https://instagram.com/ecetrankers"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${currentUrl}#webpage`,
        "url": currentUrl,
        "name": title,
        "description": description,
        "isPartOf": {
          "@id": `${siteUrl}/#website`
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": `${siteUrl}/#webapplication`,
        "name": "ECET Rankers App",
        "operatingSystem": "All",
        "applicationCategory": "EducationalApplication",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      }
    ]

    const activeSchemas = schema 
      ? [...defaultSchemas, ...(Array.isArray(schema) ? schema : [schema])] 
      : defaultSchemas

    const scriptId = "jsonld-schema-seo"
    let scriptEl = document.getElementById(scriptId)
    if (scriptEl) {
      scriptEl.textContent = JSON.stringify(activeSchemas)
    } else {
      scriptEl = document.createElement("script")
      scriptEl.id = scriptId
      scriptEl.type = "application/ld+json"
      scriptEl.textContent = JSON.stringify(activeSchemas)
      document.head.appendChild(scriptEl)
    }

    return () => {
      // Keep meta values for user experience unless replaced
    }
  }, [title, description, keywords, currentUrl, ogType, ogImage, schema, robots])

  return null
}

export default SEO
