import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const Edit = ({ attributes, setAttributes }) => {
    const { artistId } = attributes;
    
    const artists = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'artist', {
            per_page: -1,
        });
    }, []);

    const blockProps = useBlockProps();

    const artistOptions = artists ? [
        { label: __('Select an artist', 'echo-agency'), value: '' },
        ...artists.map(artist => ({
            label: artist.title.rendered,
            value: artist.id
        }))
    ] : [];

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Artist Settings', 'echo-agency')}>
                    <SelectControl
                        label={__('Select Artist', 'echo-agency')}
                        value={artistId}
                        options={artistOptions}
                        onChange={(value) => setAttributes({ artistId: parseInt(value) })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <a className="view-more-link">
                    {__('View More', 'echo-agency')}
                </a>
            </div>
        </>
    );
};

export default Edit;