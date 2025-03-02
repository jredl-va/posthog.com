const fetch = require(`node-fetch`)

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: 'PostHog',
        titleTemplate: '%s',
        description:
            'Open-source product analytics built for developers. Automate the collection of every event on your website or app, without sending data to third-parties. Quickly deploy on your own infrastructure, with full access to the underlying data.',
        url: 'https://posthog.com', // No trailing slash allowed!
        image: '/banner.png', // Path to your image you placed in the 'static' folder
        twitterUsername: '@PostHogHQ',
        siteUrl: 'https://posthog.com', // required by gatsby-plugin-sitemap
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-breakpoints',
            options: {
                queries: {
                    xs: '(max-width: 390px)',
                    sm: '(max-width: 767px)',
                    md: '(max-width: 1023px)',
                    lg: '(max-width: 1279px)',
                    xl: '(max-width: 1535px)',
                },
            },
        },
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-sass`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-smoothscroll`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `contents`,
                path: `${__dirname}/contents`,
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
                gatsbyRemarkPlugins: [
                    `gatsby-remark-static-images`,
                    { resolve: 'gatsby-remark-autolink-headers', options: { icon: false } },
                ],
                plugins: [`gatsby-remark-static-images`],
            },
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `menuItems`,
                path: `${__dirname}/src/menuItems`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `sidebars`,
                path: `${__dirname}/src/sidebars`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `navs`,
                path: `${__dirname}/src/navs`,
            },
        },
        `gatsby-transformer-gitinfo`,
        `gatsby-plugin-image`,
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'gatsby-starter-markdown',
                short_name: 'starter',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/posthog-icon-white.svg', // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-copy-linked-files`,
                        options: {
                            destinationDir: `images`,
                        },
                    },
                    {
                        resolve: `gatsby-remark-katex`,
                        options: {
                            throwOnError: false,
                        },
                    },
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            className: 'post-toc-anchor',
                        },
                    },
                    'gatsby-remark-static-images',
                    {
                        resolve: './plugins/gasby-remark-lazy-imgix',
                        options: {
                            imgixHost: process.env.CONTEXT === 'production' ? 'posthog.imgix.net' : null,
                            maxWidth: 700,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (e.g. <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (e.g. for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: 'language-',
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases. For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                            // This toggles the display of line numbers globally alongside the code.
                            // To use it, add the following line in gatsby-browser.js
                            // right after importing the prism color scheme:
                            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
                            // Defaults to false.
                            // If you wish to only show line numbers on certain code blocks,
                            // leave false and use the {numberLines: true} syntax below
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: true,
                            // Customize the prompt used in shell output
                            // Values below are default
                            prompt: {
                                user: 'root',
                                host: 'localhost',
                                global: false,
                            },
                            // By default the HTML entities <>&'" are escaped.
                            // Add additional HTML escapes by providing a mapping
                            // of HTML entities and their escape value IE: { '}': '&#123;' }
                            escapeEntities: {},
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-remove-trailing-slashes`,
        {
            resolve: `gatsby-plugin-posthog`,
            options: {
                // Specify the API key for your Posthog Project (required)
                apiKey: process.env.GATSBY_POSTHOG_API_KEY,
                // Specify the API host (http://app.posthog.com/ unless in development)
                apiHost: process.env.GATSBY_POSTHOG_API_HOST,
                // Puts tracking script in the head instead of the body (optional, default: true)
                head: true,
                // Enable posthog analytics tracking during development (optional, default: false)
                isEnabledDevMode: true,
                initOptions: {
                    _capture_metrics: true,
                },
            },
        },
        `gatsby-plugin-postcss`,
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                // Exclude specific pages or groups of pages using glob parameters
                // See: https://github.com/isaacs/minimatch
                exclude: [],
                createLinkInHead: true,
                query: `
                {
                  site {
                    siteMetadata {
                        siteUrl
                    }
                  }

                  allSitePage {
                    nodes {
                      path
                    }
                  }
                }`,
                resolveSiteUrl: ({ site }) => {
                    return site.siteMetadata.siteUrl
                },
                serialize: async ({ site, allSitePage }) => {
                    const allQueriedPages = allSitePage.nodes.map((node) => {
                        let changefreq = 'monthly'
                        let priority = 0.7
                        const path = node.path
                        if (path === '/') {
                            priority = 1.0
                            changefreq = 'monthly'
                        } else if (path.includes('blog')) {
                            if (path === '/blog') {
                                changefreq = 'weekly'
                            } else {
                                changefreq = 'yearly'
                            }
                        } else if (path.includes('product')) {
                            priority = 0.8
                        } else if (path.includes('docs')) {
                            priority = 0.9
                        } else if (path.includes('handbook')) {
                            priority = 0.6
                        } else if (path.includes('pricing')) {
                            priority = 0.8
                        } else if (path.includes('plugins')) {
                            changefreq = 'daily'
                        }

                        return {
                            url: `${site.siteMetadata.siteUrl}${path}`,
                            changefreq: changefreq,
                            priority: priority,
                        }
                    })
                    let plugins = []
                    try {
                        const pluginsResponse = await fetch(
                            'https://raw.githubusercontent.com/PostHog/plugin-repository/main/repository.json'
                        )
                        plugins = await pluginsResponse.json()
                    } catch (e) {
                        console.log(e)
                    }

                    plugins = plugins.map((plugin) => ({
                        url: `${site.siteMetadata.siteUrl}/plugins/` + plugin.name.toLowerCase().replace(/ /g, '-'),
                        changefreq: 'daily',
                        priority: 0.8,
                    }))

                    return [...allQueriedPages, ...plugins]
                },
            },
        },
        {
            resolve: `gatsby-plugin-react-svg`,
            options: {
                rule: {
                    include: /svgs/,
                },
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                setup: (options) => ({
                    ...options,
                    custom_namespaces: {
                        blog: 'https://posthog.com/blog',
                    },
                }),
                query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                    }
                  }
                }
              `,
                feeds: [
                    {
                        serialize: ({ query: { site, authorsData, allMdx } }) => {
                            let {
                                siteMetadata: { siteUrl },
                            } = site

                            let findRelevantAuthor = (authorKey) =>
                                authorsData.frontmatter.authors.find(({ handle }) => handle === authorKey)

                            let allMdxs = allMdx.edges.map((edge) => {
                                let { node } = edge
                                let { frontmatter, excerpt, slug, id, body } = node
                                let { date, title, author, featuredImage } = frontmatter
                                let authorsData = findRelevantAuthor(author)
                                let newAuthorData = []
                                if (authorsData) {
                                    newAuthorData = Object.keys(authorsData).map((key) => {
                                        let newKey = key.replace('_', '')
                                        return { [`blog:${newKey}`]: authorsData[key] }
                                    })
                                }
                                return {
                                    description: excerpt,
                                    date,
                                    title,
                                    url: `${siteUrl}/${slug}`,
                                    guid: id,
                                    author: authorsData ? authorsData.name : null,
                                    custom_elements: [{ 'content:encoded': body }],
                                    enclosure: {
                                        url: featuredImage ? `${siteUrl}${featuredImage.publicURL}` : null,
                                    },
                                }
                            })

                            return allMdxs
                        },
                        query: `
                        {
                            allMdx(
                              sort: { order: DESC, fields: [frontmatter___date] }
                              filter: { frontmatter: { rootPage: { eq: "/blog" } } }
                            ) {
                              edges {
                                node {
                                  id
                                  slug
                                  body
                                  excerpt(pruneLength: 150)
                                  frontmatter {
                                    date(formatString: "MMMM DD, YYYY")
                                    title
                                    featuredImage {
                                      publicURL
                                    }
                                    author
                                  }
                                }
                              }
                            }
                            authorsData: markdownRemark(fields: { slug: { eq: "/authors" } }) {
                              frontmatter {
                                authors {
                                  handle
                                  name
                                  role
                                  image
                                  link_type
                                  link_url
                                }
                              }
                              id
                            }
                          }
                        `,
                        output: '/rss.xml',
                        title: "PostHog's RSS Feed",
                        // optional configuration to insert feed reference in pages:
                        // if `string` is used, it will be used to create RegExp and then test if pathname of
                        // current page satisfied this regular expression;
                        // if not provided or `undefined`, all pages will have feed reference inserted
                        match: '^/blog/',
                        // optional configuration to specify external rss feed, such as feedburner
                        link: 'https://posthog.com/blog',
                    },
                ],
            },
        },
    ],
}
