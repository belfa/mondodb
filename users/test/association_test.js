const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'JS is Great', content: 'A Content'});
        comment = new Comment({content: 'Congrants for ur posts'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('saves a  realation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe' })
        .populate('blogPosts')
        .then((user) => {
            assert(user.blogPosts[0].title === 'JS is Great');
            done();
        });
    });

    it('saves a full relation tree graph', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrants for ur posts');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            })
    });
});

