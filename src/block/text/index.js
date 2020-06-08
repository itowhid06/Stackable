/**
 * BLOCK: New Block.
 */

/**
 * External dependencies
 */
import { disabledBlocks, i18n } from 'stackable'
import { TextIcon } from '~stackable/icons'
import {
	descriptionPlaceholder,
	createTypographyAttributes,
	createAllCombinationAttributes,
	createResponsiveAttributes,
} from '~stackable/util'

/**
 * Internal dependencies
 */
import edit from './edit'
import save from './save'
import deprecated from './deprecated'

/**
 * WordPress dependencies
 */
import { addFilter, applyFilters } from '@wordpress/hooks'
import { __ } from '@wordpress/i18n'

const schema = {
	design: {
		type: 'string',
		default: 'plain',
	},
	...createResponsiveAttributes( '%sColumns', {
		type: 'number',
		default: '',
	} ),
	reverseTitle: {
		type: 'boolean',
		default: false,
	},
	alignment: {
		type: 'string',
		default: 'center',
	},

	// Column Rule.
	showColumnRule: {
		type: 'boolean',
		default: false,
	},
	columnRuleColor: {
		type: 'string',
		default: '',
	},
	columnRuleWidth: {
		type: 'number',
		default: '',
	},

	// Title.
	showTitle: {
		type: 'boolean',
		default: false,
	},
	titleTag: {
		type: 'string',
		defualt: '',
	},
	title: {
		source: 'html',
		selector: '.ugb-text__title',
		default: __( 'Block Title', i18n ),
	},
	...createTypographyAttributes( 'title%s' ),
	titleColor: {
		type: 'string',
		defualt: '',
	},

	// Subtitle.
	showSubtitle: {
		type: 'boolean',
		default: false,
	},
	subtitle: {
		type: 'string',
		source: 'html',
		selector: '.ugb-text__subtitle',
		default: __( 'Subtitle', i18n ),
	},
	...createTypographyAttributes( 'subtitle%s' ),
	subtitleColor: {
		type: 'string',
		defualt: '',
	},

	// Text.
	text: {
		type: 'string',
		source: 'html',
		selector: '.ugb-text__text',
		default: descriptionPlaceholder( 'medium' ),
	},
	...createTypographyAttributes( 'text%s' ),
	textColor: {
		type: 'string',
		defualt: '',
	},

	// Alignments.
	...createAllCombinationAttributes(
		'%s%sAlign', {
			type: 'string',
			default: '',
		},
		[ 'Title', 'Subtitle', 'Text' ],
		[ '', 'Tablet', 'Mobile' ]
	),

	// Spacing.
	...createAllCombinationAttributes(
		'%s%sBottomMargin', {
			type: 'number',
			default: '',
		},
		[ 'Title', 'Subtitle', 'Text' ],
		[ '', 'Tablet', 'Mobile' ]
	),
}

export const name = 'ugb/text'

export const settings = {
	title: __( 'Advanced Text', i18n ),
	description: __( 'Start with the building block of all page layouts.', i18n ),
	icon: TextIcon,
	category: 'common',
	keywords: [
		__( 'Text', i18n ),
		__( 'Pargraph', i18n ),
		__( 'Stackable', i18n ),
	],
	attributes: schema,
	supports: {
		align: [ 'center', 'wide', 'full' ],
		inserter: ! disabledBlocks.includes( name ), // Hide if disabled.
	},

	edit,
	save,
	deprecated,

	// Stackable modules.
	modules: {
		'advanced-general': true,
		'advanced-block-spacing': true,
		'advanced-column-spacing': true,
		'advanced-responsive': true,
		'block-background': true,
		'block-separators': true,
		'content-align': true,
		'block-designs': true,
		'custom-css': {
			default: applyFilters( 'stackable.text.custom-css.default', '' ),
		},
	},
}

// If the design was changed, force turn on the title.
addFilter( 'stackable.text.setAttributes', 'stackable/text/design', ( attributes, blockProps ) => {
	if ( typeof attributes.design === 'undefined' ) {
		return attributes
	}

	const blockAttributes = blockProps.attributes

	if ( attributes.design === 'side-title-1' || attributes.design === 'side-title-2' ) {
		if ( blockAttributes.design !== 'side-title-1' && blockAttributes.design !== 'side-title-2' ) {
			attributes.showTitle = true
		}
	}

	return attributes
} )
