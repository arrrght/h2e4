Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',

		initComponent: function() {
			Ext.apply(this, {
				layout: 'fit',
				items: {
					xtype: 'panel',
					html: 'It\'s a private area, <%= session.user %>.'
				}
			});
			this.callParent(arguments);
		}
});
