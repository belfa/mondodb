const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const joe = new User({
             name: 'Joe', 
             posts: [{title: 'PostTitle'}]
        });

        joe.save()
        .then(() => User.findOne({name:'Joe'}))
        .then((user)=> {
            assert(user.posts[0].title === 'PostTitle');
            done();
        });
    });

    it('Can add sudocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
        .then(()=> User.findOne({name: 'Joe'}))
        .catch((error) => console.log(error))
        .then((user)=> {
            user.posts.push({title: 'New Post'});
            return user.save();
        }).catch((error) => console.log(error))
        .then(() => User.findOne({name: 'Joe'}))
        .catch((error) => console.log(error))
        .then((user) => {
            assert(user.posts[0].title === 'New Post');
            done();
        })
        .catch((error) => console.log(error));
    });


    it('can remove an existing subdocument', (done) => {
        const joe = new User({name:'Joe', posts: [{title: 'New Title'}]});
        joe.save()
        .then((user)=> {
            user.posts[0].remove();
            return user.save();
        })
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) => {
            assert(user.posts.length === 0);
            done();
        });
    })
});