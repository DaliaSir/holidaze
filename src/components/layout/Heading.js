import PropTypes from "prop-types";

export default function Heading({ size = "1", content }) {
  const DynamicHeading = `h${size}`;
  return <DynamicHeading>{content}</DynamicHeading>;
}

Heading.propTypes = {
  content: PropTypes.string.isRequired,
  size: PropTypes.string,
};