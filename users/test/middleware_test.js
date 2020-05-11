const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Midleware', () => {

    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name : 'Joe'});
        blogPost = new BlogPost({title: 'JS is Great', content: 'Yep, this a content'});
        
        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            })
    })
});