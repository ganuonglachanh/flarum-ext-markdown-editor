import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import Button from 'flarum/components/Button';
import TextEditor from 'flarum/components/TextEditor';

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
export default class EnhancedTextEditor extends TextEditor {
  view() {
    return (
      <div className="TextEditor">
        <ul className="TextEditor-controls EnhancedTextEditor-toolbar">
          {listItems(this.toolbarItems().toArray())}
        </ul>
        <textarea className="FormControl Composer-flexible"
          config={this.configTextarea.bind(this)}
          oninput={m.withAttr('value', this.oninput.bind(this))}
          placeholder={this.props.placeholder || ''}
          disabled={!!this.props.disabled}
          value={this.value()}/>

        <ul className="TextEditor-controls Composer-footer">
          {listItems(this.controlItems().toArray())}
        </ul>
      </div>
    );
  }

  /**
   * Configure the textarea element.
   *
   * @param {DOMElement} element
   * @param {Boolean} isInitialized
   */
  configTextarea(element, isInitialized) {
    if (isInitialized) return;

    const handler = () => {
      this.onsubmit();
      m.redraw();
    };

    $(element).bind('keydown', 'meta+return', handler);
    $(element).bind('keydown', 'ctrl+return', handler);
    $(element).bind('keydown', 'ctrl+b', e => {
      this.bold();
      e.preventDefault();
    });
    $(element).bind('keydown', 'ctrl+i', e => {
      this.italic();
      e.preventDefault();
    });
  }

  /**
     * Build an item list for the text editor toolbar.
     *
     * @return {ItemList}
     */
    toolbarItems() {
      const items = new ItemList();

      items.add('bold',
        Button.component({
          icon: 'bold',
          title: app.translator.trans('ogioncz-mdeditor.forum.toolbar.bold'),
          className: 'Button',
          onclick: () => this.bold()
        })
      );

      items.add('italic',
        Button.component({
          icon: 'italic',
          className: 'Button',
          title: app.translator.trans('ogioncz-mdeditor.forum.toolbar.italic'),
          onclick: () => this.italic()
        })
      );

      items.add('link',
        Button.component({
          icon: 'link',
          className: 'Button',
          onclick: () => this.link()
        })
      );

      return items;
  }

  /**
   * Insert content into the textarea before and after the position of the cursor.
   *
   * @param {String} before
   * @param {String} after
   */
  insertAroundCursor(before, after) {
    const textarea = this.$('textarea')[0];
    const value = this.value();
    const start = textarea ? textarea.selectionStart : value.length;
    const end = textarea ? textarea.selectionEnd : value.length;

    this.setValue(value.slice(0, start) + before + value.slice(start, end) + after + value.slice(end));

    // Keep the selected text selected
    if (textarea) {
      const newStart = start + before.length;
      const newEnd = end + before.length;
      this.setSelectionRange(newStart, newEnd);
    }
  }

  /**
   * Make selected text bold.
   */
  bold() {
    this.insertAroundCursor('**', '**')
  }

  /**
   * Make selected text italic.
   */
  italic() {
    this.insertAroundCursor('*', '*')
  }

  /**
   * Insert link around selected text.
   */
  link() {
    this.insertAroundCursor('[', '](https://)')
  }
}
