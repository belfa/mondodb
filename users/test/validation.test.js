const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {
    it('requires a user name', () => {
        const user = new User( {name: undefined} );
        console.info(user.validateSync());
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name is required.');
    });

    it('requires a user\'s aname longer thaan 2 characters', () => {
        const user = new User({ name: 'Al'});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
    });

    it('disallows invalidad records from being saved', (done) => {
        const user = new User({name: 'Al'});
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;

                assert(message === 'Name must be longer than 2 characters.');
                done();
            })
    });
})