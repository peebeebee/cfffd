/**
 * Custom Form Field Implementations
 * Simplified Drupalized version, based on Filament Group's customfileinput plugin.
 * @see: https://github.com/filamentgroup/jQuery-Custom-File-Input
 *
 * @author Peter Briers
 * @version 0.2
 */

(function( $ ) {

  $.fn.dcfFile = function() {
    var $container = $(this);
    var $button = $('.dcf-button', $container);
    var $feedback = $('.dcf-feedback', $container);
    var $input = $('.dcf-input', $container);
    $container
      .click(function(event) {
        $input.trigger('click');
      });
    $input
      .bind('change',function() {
        var filename = $(this).val().split(/\\/).pop();
        $feedback.text(filename);
      })
      .click(function(event) {
        $input.data('val', $input.val());
        //for IE and Opera, make sure change fires after choosing a file, using an async callback
        setTimeout(function(){ $input.trigger('checkChange'); }, 100);
        event.stopPropagation();
      })
      .bind('checkChange', function(){
        if($input.val() && $input.val() != $input.data('val')){
          $input.trigger('change');
        }
      });
  }

  $.fn.dcfSelect = function() {
    var $input = $('select', this);
    var $container = $input.wrap('<div class="cff-container cff-select">').parent();
    var $replacement = $('<div class="cff-replacement"></div>').insertAfter($input);
    var $button = $('<span class="cff-button"></span>').appendTo($replacement);
    var $feedback = $('<span class="cff-feedback"></span>').appendTo($replacement);
    $input
      .addClass('cff-input')
      .bind('change',function(){
        var currentSelected = $container.find(':selected');
        var html = currentSelected.html() || '&nbsp;';
        $feedback.html(html);
      })
      .click(function(event){
        $input.data('val', $input.val());
        //for IE and Opera, make sure change fires after choosing a file, using an async callback
        setTimeout(function(){ $input.trigger('checkChange'); }, 100);
        event.stopPropagation();
      })
      .bind('checkChange', function(){
        if($input.val() && $input.val() != $input.data('val')){
          $input.trigger('change');
        }
      })
      .trigger('change');
  }

  $.fn.dcfCheckbox = function() {
    // Add checked class to checkbox labels.
    $('.form-type-checkbox label').click(function() {
      $(this).toggleClass('checked');
    });
  }

  $.fn.dcfRadio = function() {
    // Add checked class to radio button labels.
    $('.form-type-radio .form-radio:checked').parent().find('label').addClass('checked');
    $('.form-type-radio label').click(function() {
      if (! $(this).hasClass('checked')) {
        $(this).toggleClass('checked');
        $('.form-type-radio label').not(this).removeClass('checked');
      }
      // Clicking label not fully triggers checkbox to be checked in IE (MOBICZ-406).
      var checkbox = $(this).closest('.form-radio');
      var forAttribute = $(this).attr('for');
      if (!checkbox.is(':checked') && forAttribute !== '') {
        $('#' + forAttribute).click().change();
      }
    });
  }

  $.dcf = function() {
    $('.form-type-radio').dcfFile();
    $('.form-type-checkbox').dcfCheckbox();
    $('.form-type-radio').dcfRadio();
    $('.form-type-select').dcfSelect();
  }

})( jQuery );



