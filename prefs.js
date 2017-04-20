const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const Lang = imports.lang;

const PrefWindow = new GObject.Class({
	Name: 'PrefWindow',
	GTypeName: 'PrefWindow',
	Extends: Gtk.Grid,
	_init: function(params) {
		this.parent(params);
		this._settings = Convenience.getSettings('org.gnome.shell.extensions.configure-notifications');
		this._widgets = {};

		this._widgets.box = new Gtk.Box({
			orientation: Gtk.Orientation.VERTICAL,
			margin: 20,
			margin_top: 10,
			expand: true,
			spacing: 10,
		});

		this._addTimeoutWidget();

		this.add(this._widgets.box);
	},

	_addTimeoutWidget: function() {
		let label = new Gtk.Label({
			label: '<b>Notification timeout</b>',
			use_markup: true,
			halign: Gtk.Align.START
		});

		let adjustment = new Gtk.Adjustment({
			lower: 0,
			upper: 3600,
			step_increment: 1,
			page_increment: 1
		});

		this._widgets.timeout = new Gtk.SpinButton({
			adjustment: adjustment
		});

		this._widgets.timeout.set_value(this._settings.get_int('timeout'));

		this._widgets.timeout.set_digits(0);

		let hbox = new Gtk.Box({
			orientation: Gtk.Orientation.HORIZONTAL,
		});

		hbox.pack_start(label, true, true, 0);
		hbox.add(this._widgets.timeout);

		this._widgets.box.add(hbox);

		this._widgets.timeout.connect('value-changed', Lang.bind(this, this._timeoutChanged));
	},

	_timeoutChanged: function() {
		let value = this._widgets.timeout.get_value();
		this._settings.set_int('timeout', value);
	},
});

function init() {

}

function buildPrefsWidget() {
	let prefWindow = new PrefWindow();
	prefWindow.show_all();
	return prefWindow;
}
