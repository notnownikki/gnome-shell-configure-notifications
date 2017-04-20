/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

const MessageTray = imports.ui.messageTray;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const settings = Convenience.getSettings('org.gnome.shell.extensions.configure-notifications');

function init() {
    let tray = MessageTray.MessageTray.prototype;
    tray.oldUpdateNotificationTimeout = tray._updateNotificationTimeout;
}

function enable() {
    MessageTray.MessageTray.prototype._updateNotificationTimeout = function(timeout) {
        if ( timeout ) {
        	timeout = settings.get_int('timeout') * 1000;
        }
        this.oldUpdateNotificationTimeout( timeout );
    }
}

function disable() {
    let tray = MessageTray.MessageTray.prototype;
    tray._updateNotificationTimeout = tray.oldUpdateNotificationTimeout;
}
