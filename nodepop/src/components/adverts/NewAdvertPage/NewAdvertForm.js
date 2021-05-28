// libraries imports
import React from 'react';

// local imports
import { Button, FormField, Checkbox, Select } from '../../shared';

function NewAdvertForm({ tags, onSubmit }) {

    const initialValues = {
        name: '',
        price: null,
        sale: false,
        tags: []
    };

    const photo = React.createRef();
    const [newAdvert, setNewAdvert] = React.useState(initialValues);

    const handleNewAdvert = event => {
        let tagsValues = [];

        if (event.target.name === 'tags') {
            for (const option of event.target.options) {
                if (option.selected) {
                    tagsValues.push(option.value);
                }
            }
        }

        setNewAdvert(newAdvert => {
            return {
                ...newAdvert,
                [event.target.name]: event.target.type === 'checkbox' ? 
                                     event.target.checked : 
                                     event.target.name === 'tags' ?
                                     tagsValues :
                                     event.target.value
            };
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(newAdvert, photo.current.files);
    }

    return (
        <form className='newAdvert-form' onSubmit={handleSubmit}>
            <FormField 
                className={'input is-primary'}
                type={'text'} 
                name={'name'}
                placeholder={'name'}
                value={newAdvert.name}
                onChange={handleNewAdvert}
            />
            <FormField 
                className={'input is-primary'} 
                type={'number'}
                name={'price'}
                placeholder={'price'}
                value={newAdvert.price}
                onChange={handleNewAdvert}
            />
            <Checkbox
                className={'checkbox'} 
                name={'sale'}
                type={'checkbox'}
                text={'Sale'}
                disabled={false}
                checked={newAdvert.sale}
                onChange={handleNewAdvert}
            />
            <Select 
                tags={tags}
                name={'tags'}
                multiple
                onChange={handleNewAdvert}
            />
            <input name='photo' type='file' ref={photo} />
            <Button
                className={'button is-primary is-rounded'}
                text={'New Advert'}
                disabled={!newAdvert.name || !newAdvert.price ||!newAdvert.tags.length}
            />
        </form>
    );
}

export default NewAdvertForm;