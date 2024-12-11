import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { SelectControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

registerBlockType('echo-agency/artist-filter', {
    title: __('Artist Filter', 'echo-agency'),
    category: 'widgets',
    attributes: {
        selectedDiscipline: {
            type: 'string',
            default: ''
        }
    },
    edit: EditComponent,
    save: () => null // Dynamic block
});

function EditComponent({ attributes, setAttributes }) {
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/wp-json/wp/v2/discipline')
            .then(response => response.json())
            .then(data => {
                const options = data.map(discipline => ({
                    label: discipline.name,
                    value: discipline.id
                }));
                options.unshift({ label: __('All Disciplines', 'echo-agency'), value: '' });
                setDisciplines(options);
                setLoading(false);
            });
    }, []);

    if (loading) return <Spinner />;

    return (
        <div>
            <SelectControl
                label={__('Filter by Discipline', 'echo-agency')}
                value={attributes.selectedDiscipline}
                options={disciplines}
                onChange={value => setAttributes({ selectedDiscipline: value })}
            />
        </div>
    );
}