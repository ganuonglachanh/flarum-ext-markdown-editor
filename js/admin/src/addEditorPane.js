import {extend} from "flarum/extend";
import AdminNav from "flarum/components/AdminNav";
import AdminLinkButton from "flarum/components/AdminLinkButton";
import EditorPage from "ogioncz/mdeditor/components/EditorPage";

export default function () {
    // create the route
    app.routes['ogioncz-mdeditor'] = {path: '/ogioncz/mdeditor', component: EditorPage.component()};

    // bind the route we created to the three dots settings button
    app.extensionSettings['ogioncz-mdeditor'] = () => m.route(app.route('ogioncz-mdeditor'));

    extend(AdminNav.prototype, 'items', items => {
        // add the Editor tab to the admin navigation menu
        items.add('ogioncz-mdeditor', AdminLinkButton.component({
            href: app.route('ogioncz-mdeditor'),
            icon: 'pencil',
            children: app.translator.trans('ogioncz-mdeditor.admin.help_texts.title'),
            description: app.translator.trans('ogioncz-mdeditor.admin.help_texts.description')
        }));
    });
}
