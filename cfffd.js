/**
 * Custom Form Field Implementations
 * Simplified Drupalized version, based on Filament Group's customfileinput plugin.
 * @see: https://github.com/filamentgroup/jQuery-Custom-File-Input
 *
 * @author Peter Briers
 * @version 0.2
 */

(function( $ ) {

  $.fn.cffFile = function() {


    var $container = $(this);
    var $button = $('.cff-button', $container);
    var $feedback = $('.cff-feedback', $container);
    var $input = $('.cff-input', $container);
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

  $.fn.cffSelect = function() {
    var $input = $(this);
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
        console.log('whut');
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

})( jQuery );



