(function ($) {
  var LANGUAGES = {
    'arduino': 'Arduino',
    'armasm': 'ARM Assembly'
  };

  var STYLES = ['Arduino Light', 'Arta'];

  var localStorage = window.localStorage;

  var elements = {}, recentLanguages = [], lastStyle = 'Default';
  if (localStorage) {
    try {
      lastStyle = localStorage['lastStyle'] || 'Default';
      var array = JSON.parse(localStorage['recentLanguages']);
      if ($.isArray(array)) {
        recentLanguages = array;
      }
    } catch (e) {
    }
  }

  function highlight(input) {
    elements.code.text(input);
    elements.code.attr('class', elements.language.val());
    hljs.highlightBlock(elements.code[0]);
  }
  window.highlight = highlight;

  function refreshRecentLanguages() {
    var html = '';
    recentLanguages.forEach(function (key) {
      html += '<option value="' + key + '">' + LANGUAGES[key] + '</option>';
    });
    elements.groupRecent.html(html);
  }

  $(document).ready(function () {
    elements.code = $('<code class="html"/>');
    $('<pre/>').append(elements.code).insertAfter($('#output'));
    $('#output').remove();

    elements.groupRecent = $('<optgroup label="Recent"></optgroup>')
    elements.groupAll = $('<optgroup label="All"></optgroup>');
    elements.language = $('<select />')
      .append(elements.groupRecent, elements.groupAll)
      .change(function () {
        $('#pagina').load();

        recentLanguages.unshift(elements.language.val());
        var arr = [];
        // unique
        recentLanguages.forEach(function (key) {
          if ($.inArray(key, arr) == -1) {
            arr.push(key);
          }
        });
        recentLanguages = arr.slice(0, 1);

        if (localStorage) {
          localStorage['recentLanguages'] = JSON.stringify(recentLanguages);
        }

        var label = elements.language.find(":selected").parent().attr('label');
        if (label == 'All') {
          refreshRecentLanguages();
        }
      });
    $('<div class="option-block"><label>Language: </label></div>').append(elements.language).insertBefore('.submit');

    var html = '';
    for (var key in LANGUAGES) {
      html += '<option value="' + key + '">' + LANGUAGES[key] + '</option>';
    }
    elements.groupAll.html(html);
    refreshRecentLanguages();
    if (recentLanguages.length) {
      elements.language.val(recentLanguages[0]);
    }

    elements.style = $('<select id="style"></select>').change(function () {
      var style = elements.style.val();
      $('link[title]').attr('disabled', 'disabled');
      $('link[title="' + style + '"]').removeAttr('disabled');
      if (localStorage) {
        localStorage['lastStyle'] = style;
      }
    });
    $('<div class="option-block"><label>Style: </label></div>').append(elements.style).insertBefore('.submit');

    html = '';
    STYLES.forEach(function (style) {
      html += '<option value="' + style + '">' + style + '</option>';
    });
    elements.style.html(html).val(lastStyle).change();
  });
})(jQuery);
