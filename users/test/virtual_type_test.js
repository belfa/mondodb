const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{'title': 'PostTitle'}]
        });

        joe.save()
        .catch((error) => console.log(error))
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) => {
            assert(user.postCount === 1);
            done();
        });
    });
})