import {extend} from "flarum/extend";
import app from "flarum/app";
import PermissionGrid from "flarum/components/PermissionGrid";
import addEditorPane from "ogioncz/mdeditor/addEditorPane";

app.initializers.add('ogioncz-mdeditor', app => {
    // add the admin pane
    addEditorPane();
});
