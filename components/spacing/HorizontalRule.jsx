/**
 * Developed by Anthony Cox in 2026
 */
import './css/spacing-horizontal-rule.css';
import '../css/common.css';

const HorizontalRule = () => {
	const horizontalRuleCss = 'component-container-width background-transparent';
	return (
		<hr className={horizontalRuleCss} role="none"></hr>
	);
};
export default HorizontalRule;
