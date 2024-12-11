import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { content, scrollStrength } = attributes;
  const blockProps = useBlockProps();

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Animation Settings', 'my-theme')}>
          <RangeControl
            label={__('Scroll Strength', 'my-theme')}
            value={scrollStrength}
            onChange={(value) => setAttributes({ scrollStrength: value })}
            min={1}
            max={5}
            step={0.1}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <RichText
          tagName="div"
          className="text-plane"
          value={content}
          onChange={(content) => setAttributes({ content })}
          placeholder={__('Add text...', 'my-theme')}
        />
        <canvas id="canvas"></canvas>
      </div>
    </>
  );
}