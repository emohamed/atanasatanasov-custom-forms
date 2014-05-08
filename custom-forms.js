// Custom Checkboxes
jQuery.fn.customCheckboxes = function() {
	var $checkbox = jQuery(this);
	var checkedClass = 'checked';
	var $checkboxLabel;

	$checkbox.on('change', function(event) {
		$checkbox = jQuery(this);
		$checkboxLabel = $checkbox.parents('label')

		if ( $checkbox.prop('checked') === true ) {
			$checkboxLabel.addClass(checkedClass);
		} else {
			$checkboxLabel.removeClass(checkedClass);
		}
	});

	return this.each(function() {
		$checkbox = jQuery(this);
		$checkboxLabel = $checkbox.parents('label')

		if ( !$checkbox.parents('.custom-checkbox').length ) {
			$checkbox.wrap('<span class="custom-checkbox" />').parent().append('<span class="checkbox-icon" />');
		}

		if ( $checkbox.prop('checked') === true ) {
			$checkboxLabel.addClass(checkedClass);
		}

		if ( $checkbox.prop('disabled') === true ) {
			$checkboxLabel.addClass('disabled');
		}
	});
}

// Custom Radio Buttons
jQuery.fn.customRadios = function() {
	var $radio = jQuery(this);
	var checkedClass = 'checked';

	$radio.on('change', function() {
		$radio = jQuery(this);
		
		if ( $radio.prop('checked') === true ) {
			var radioGroup = $radio.attr('name');

			jQuery('input[name="' + radioGroup + '"]').each(function() {
				jQuery(this).parents('label').removeClass(checkedClass);
			});

			$radio.parents('label').addClass(checkedClass);
		}
	});

	return this.each(function() {
		$radio = jQuery(this);

		if ( !$radio.parents('.custom-radio').length ) {
			$radio.wrap('<span class="custom-radio" />').parent().append('<span class="radio-icon" />');

			if ( $radio.prop('checked') === true ) {
				$radio.parents('label').addClass(checkedClass);
			}
		}

		if ( $radio.prop('disabled') === true ) {
			$radio.parents('label').addClass('disabled');
		}
	});
}

// Custom File Input
jQuery.fn.customUploadOverlay = function() {
	var $fileButton = jQuery(this);
	var customClassName = 'custom-upload';

	$fileButton.on('change', function(event) {
		var $button = $(this);
		var buttonValue = $button.val().split('\\').pop();
		var buttonRelation = $button.data('related');
		var $textField = $('#' + buttonRelation);

		$textField.val(buttonValue);
	});

	return this.each(function() {
		var $button = jQuery(this);
		var initialText = $button.data('text') !== undefined ? $button.data('text') : 'Browse';
		var uniqueClassName = $button.attr('class') !== undefined ? $button.attr('class') : '';

		if ( !$button.parents('.' + customClassName + '-button ' + uniqueClassName).length ) {
			$button.wrap('<div class="' + customClassName + '-button ' + uniqueClassName + '" />')
				.parent().append('<div class="' + customClassName + '-overlay">' + '<i class="icon-upload"></i>' + initialText + '</div>');
		}
	});
}

// Custom Select Field
jQuery.fn.customSelectOverlay = function() {
	var $selectbox = $(this);
	var customClassName = 'custom-select';

	$selectbox.on('change', function(event) {
		$selectbox = $(this);

		var selectedValue = this.value;

		$selectbox.parents('.' + customClassName).find('.' + customClassName + '-value').text(selectedValue);
	});

	return this.each(function() {
		$selectbox = jQuery(this);

		if ( !$selectbox.parents('.' + customClassName).length ) {
			var wrapTag = 'div';
			var $overlay = jQuery('<' + wrapTag + ' class="' + customClassName + '-overlay">' + 
								'<' + wrapTag + ' class="' + customClassName + '-value" />' + 
								'<' + wrapTag + ' class="' + customClassName + '-button">' + 
									'<' + wrapTag + ' class="' + customClassName + '-arrow" />' + 
								'</' + wrapTag + '>' + 
							'</' + wrapTag + '>');

			$selectbox.wrap('<' + wrapTag + ' class="' + customClassName + '" />');
			$selectbox.parents('.' + customClassName + '').prepend($overlay);
		}

		$selectbox.trigger('change');
	});
}

// Inits
jQuery.customCheckboxes = function() {
	jQuery('input[type="checkbox"]').customCheckboxes();
}

jQuery.customRadios = function() {
	jQuery('input[type="radio"]').customRadios();
}

jQuery.customUploadOverlay = function() {
	jQuery('input[type="file"]').customUploadOverlay();
}

jQuery.customSelectOverlay = function() {
	jQuery('select').customSelectOverlay();
}

