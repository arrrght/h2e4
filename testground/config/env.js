Env.current = 'dev';

Env.create('default', {
	config: {
		db: 'foo1',
		sessionSecret: 'secret',
		appDir: '/app',
	}
});

Env.create('dev', {
	extend: 'default',
	config: {
		db: 'foo2',
		dumpExceptions: true, 
		showStack: true 
	}
});
