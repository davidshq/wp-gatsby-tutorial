// Code from: https://github.com/gatsbyjs/gatsby-source-wordpress-experimental/blob/master/docs/tutorials/building-a-new-site-wordpress-and-gatsby.md
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWpPost(sort: { fields: [date] }) {
        nodes {
            title
            excerpt
            content
            slug
        }
      }
    }
  `).then(result => {
    result.data.allWpPost.nodes.forEach((node) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.slug,
        },
      })
    })
  })
}
