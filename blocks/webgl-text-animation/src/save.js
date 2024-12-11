import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { content, scrollStrength } = attributes;
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps} data-scroll-strength={scrollStrength}>
      <div className="text-plane">
        <RichText.Content value={content} tagName="div" />
      </div>
      <canvas id="canvas"></canvas>
    </div>
  );
}