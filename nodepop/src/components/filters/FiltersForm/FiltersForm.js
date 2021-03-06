// libraries imports
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// local imports
import { FormField, Checkbox, Button, Select } from '../../shared';
import './FiltersForm.css';
import { getTags } from '../../../store/selectors.js';
import { advertsFilterAction } from '../../../store/actions.js';

function FiltersForm() {

    const initialFilters = {
        name: '',
        minPrice: null,
        maxPrice: null,
        sale: false,
        purchase: false,
        tags: []
    };

    const tags = useSelector(getTags);
    const dispatch = useDispatch();

    const [filters, setFilters] = React.useState(initialFilters);

    const handleFiltersForm = event => {

        let tagsValues = [];

        if (event.target.name === 'tags') {
            for (const option of event.target.options) {
                if (option.selected) {
                    tagsValues.push(option.value);
                }
            }
        }

        setFilters(filters => {
            return {
                ...filters,
                [event.target.name]: event.target.type === 'checkbox' ? 
                                     event.target.checked : 
                                     event.target.name === 'tags' ?
                                     tagsValues :
                                     event.target.value
            };
        });
    };

    const handleSubmitFilterForm = event => {
        event.preventDefault();
        dispatch(advertsFilterAction(filters));  
    };

    return (
        <form onSubmit={handleSubmitFilterForm} className='filters'>
            <FormField 
                className={'input is-primary'}
                type={'text'}
                name={'name'}
                placeholder={'name'}
                value={filters.name}
                onChange={handleFiltersForm}
            />
            <FormField 
                className={'input is-primary'}
                type={'number'}
                name={'minPrice'}
                placeholder={'min price'}
                value={filters.minPrice}
                onChange={handleFiltersForm}
            />
            <FormField 
                className={'input is-primary'}
                type={'number'}
                name={'maxPrice'}
                placeholder={'max price'}
                value={filters.maxPrice}
                onChange={handleFiltersForm}
            />
            <Checkbox
                className={'checkbox checkbox-filters'}
                name={'sale'}
                type={'checkbox'}
                text={'Sale'}
                disabled={false}
                checked={filters.sale}
                onChange={handleFiltersForm}
            />
            <Checkbox
                className={'checkbox checkbox-filters'}
                name={'purchase'}
                type={'checkbox'}
                text={'Purchase'}
                disabled={false}
                checked={filters.purchase}
                onChange={handleFiltersForm}
            />
            <Select 
                tags={tags}
                name={'tags'}
                multiple
                onChange={handleFiltersForm}
            />
            <Button 
                className={'button is-primary is-rounded'} 
                text={'Search'}
            />
        </form>
    );
}

export default FiltersForm;