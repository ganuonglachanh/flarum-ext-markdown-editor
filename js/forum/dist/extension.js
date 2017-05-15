System.register('ogioncz/mdeditor/components/EnhancedTextEditor', ['flarum/utils/ItemList', 'flarum/helpers/listItems', 'flarum/components/Button', 'flarum/components/Separator', 'flarum/components/TextEditor'], function (_export) {

  /**
   * The `EnhancedTextEditor` component displays a textarea with controls, including a
   * submit button.
   *
   * ### Props
   *
   * - `submitLabel`
   * - `value`
   * - `placeholder`
   * - `disabled`
   */
  'use strict';

  var ItemList, listItems, Button, Separator, TextEditor, EnhancedTextEditor;
  return {
    setters: [function (_flarumUtilsItemList) {
      ItemList = _flarumUtilsItemList['default'];
    }, function (_flarumHelpersListItems) {
      listItems = _flarumHelpersListItems['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumComponentsSeparator) {
      Separator = _flarumComponentsSeparator['default'];
    }, function (_flarumComponentsTextEditor) {
      TextEditor = _flarumComponentsTextEditor['default'];
    }],
    execute: function () {
      EnhancedTextEditor = (function (_TextEditor) {
        babelHelpers.inherits(EnhancedTextEditor, _TextEditor);

        function EnhancedTextEditor() {
          babelHelpers.classCallCheck(this, EnhancedTextEditor);
          babelHelpers.get(Object.getPrototypeOf(EnhancedTextEditor.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(EnhancedTextEditor, [{
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'TextEditor' },
              m(
                'ul',
                { className: 'TextEditor-controls EnhancedTextEditor-toolbar' },
                listItems(this.toolbarItems().toArray())
              ),
              m('textarea', { className: 'FormControl Composer-flexible',
                config: this.configTextarea.bind(this),
                oninput: m.withAttr('value', this.oninput.bind(this)),
                placeholder: this.props.placeholder || '',
                disabled: !!this.props.disabled,
                value: this.value() }),
              m(
                'ul',
                { className: 'TextEditor-controls Composer-footer' },
                listItems(this.controlItems().toArray())
              )
            );
          }

          /**
           * Configure the textarea element.
           *
           * @param {DOMElement} element
           * @param {Boolean} isInitialized
           */
        }, {
          key: 'configTextarea',
          value: function configTextarea(element, isInitialized) {
            var _this = this;

            if (isInitialized) return;

            var handler = function handler() {
              _this.onsubmit();
              m.redraw();
            };

            $(element).bind('keydown', 'meta+return', handler);
            $(element).bind('keydown', 'ctrl+return', handler);
            $(element).bind('keydown', 'ctrl+b', function (e) {
              _this.bold();
              e.preventDefault();
            });
            $(element).bind('keydown', 'ctrl+i', function (e) {
              _this.italic();
              e.preventDefault();
            });
          }

          /**
             * Build an item list for the text editor toolbar.
             *
             * @return {ItemList}
             */
        }, {
          key: 'toolbarItems',
          value: function toolbarItems() {
            var _this2 = this;

            var items = new ItemList();

            items.add('bold', Button.component({
              icon: 'bold',
              title: app.translator.trans('ogioncz-mdeditor.forum.toolbar.bold'),
              className: 'Button',
              onclick: function onclick() {
                return _this2.bold();
              }
            }));

            items.add('italic', Button.component({
              icon: 'italic',
              className: 'Button',
              title: app.translator.trans('ogioncz-mdeditor.forum.toolbar.italic'),
              onclick: function onclick() {
                return _this2.italic();
              }
            }));

            items.add('link', Button.component({
              icon: 'link',
              className: 'Button',
              onclick: function onclick() {
                return _this2.link();
              }
            }));

            var symbols = JSON.parse(app.forum.attribute('editorSymbols') || '[]');

            if (symbols.length > 0) {
              items.add('sep', Separator.component());

              var _loop = function (i) {
                var symbol = symbols[i];
                items.add('symbol-' + i, Button.component({
                  children: symbol.label || symbol.insert,
                  className: 'Button',
                  onclick: function onclick() {
                    return _this2.insertAtCursor(symbol.insert);
                  }
                }));
              };

              for (var i in symbols) {
                _loop(i);
              }
            }

            return items;
          }

          /**
           * Insert content into the textarea before and after the position of the cursor.
           *
           * @param {String} before
           * @param {String} after
           */
        }, {
          key: 'insertAroundCursor',
          value: function insertAroundCursor(before, after) {
            var textarea = this.$('textarea')[0];
            var value = this.value();
            var start = textarea ? textarea.selectionStart : value.length;
            var end = textarea ? textarea.selectionEnd : value.length;

            this.setValue(value.slice(0, start) + before + value.slice(start, end) + after + value.slice(end));

            // Keep the selected text selected
            if (textarea) {
              var newStart = start + before.length;
              var newEnd = end + before.length;
              this.setSelectionRange(newStart, newEnd);
            }
          }

          /**
           * Make selected text bold.
           */
        }, {
          key: 'bold',
          value: function bold() {
            this.insertAroundCursor('**', '**');
          }

          /**
           * Make selected text italic.
           */
        }, {
          key: 'italic',
          value: function italic() {
            this.insertAroundCursor('*', '*');
          }

          /**
           * Insert link around selected text.
           */
        }, {
          key: 'link',
          value: function link() {
            this.insertAroundCursor('[', '](https://)');
          }
        }]);
        return EnhancedTextEditor;
      })(TextEditor);

      _export('default', EnhancedTextEditor);
    }
  };
});;
System.register('ogioncz/mdeditor/main', ['flarum/extend', 'flarum/app', 'flarum/components/ComposerBody', 'ogioncz/mdeditor/components/EnhancedTextEditor'], function (_export) {
    'use strict';

    var extend, app, ComposerBody, EnhancedTextEditor;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumComponentsComposerBody) {
            ComposerBody = _flarumComponentsComposerBody['default'];
        }, function (_ogionczMdeditorComponentsEnhancedTextEditor) {
            EnhancedTextEditor = _ogionczMdeditorComponentsEnhancedTextEditor['default'];
        }],
        execute: function () {

            app.initializers.add('ogioncz-mdeditor', function () {
                extend(ComposerBody.prototype, 'init', function init() {
                    this.editor = new EnhancedTextEditor({
                        submitLabel: this.props.submitLabel,
                        placeholder: this.props.placeholder,
                        onchange: this.content,
                        onsubmit: this.onsubmit.bind(this),
                        value: this.content()
                    });
                });
            });
        }
    };
});