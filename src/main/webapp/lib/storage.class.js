/*
 File: storage.js
 Date: May 2012
 Author: Information Design One AG
 Purpose: Web storage handling
 */

(function()
{
	// ---------------------------------------------------------------------------------------------- //
	// Preferences
	// ---------------------------------------------------------------------------------------------- //

	var Prefs =
	{
		space: { name: undefined, delimiter: '::' },
		database: { size: 10*1024*1024, name: 'storage' }
	};

	var me = id.meOf('storage');

	// ---------------------------------------------------------------------------------------------- //
	// Functionality
	// ---------------------------------------------------------------------------------------------- //

	module({ ns: 'id.storage', definition: function()
	{
		// ---------------------------------------------------------------------------------------- //
		// Classes
		// ---------------------------------------------------------------------------------------- //

		classify({ name: 'Base', definition: function()
		{
			var space;

			// ------------------------------------------------------------------------------------- //
			// Init
			// ------------------------------------------------------------------------------------- //

			def({ name: 'initialize', method: function(options)
			{
				options = options || {};
				space = options.space ||�Prefs.space.name;
			}});

			def({ name: 'abstractError', method: function abstractError(name) { return id.error(me+'Driver doesn\'t support the operation "'+name+'"!'); }});
			def({ name: 'error', method: function error(message) { return id.error(me+message); }});

			// ------------------------------------------------------------------------------------- //
			// High Level Functions
			// ------------------------------------------------------------------------------------- //

			def({ name: 'query', method: function query(filter)
			{
				var result = [];
				collect(this, filter, result);

				return result;
			}});

			def({ name: 'count', method: function count(filter)
			{
				return collect(this, filter);
			}});

			function collect(that, filter, result)
			{
				filter = that.spaceOf(filter);

				for (var i = 0, n = that.sizeOf(), k = 0, key; i < n; i++)
				{
					key = that.byIndex(i);

					if (key && key.match(filter))
					{
						if (result) result.push(key);
						k++;
					}
				}

				return k;
			}

			def({ name: 'clear', method: function clear(filter)
			{
				id.note(me+'CLEAR local storage'+(filter ? ' by filter "'+filter+'"' : '')+' ..');

				var result = this.query(filter);

				for (var i = result.length, n = 0; i--;)
				{
					id.note(me+'Removing "'+result[i]+'"');
					this.remove(result[i]);

					n++;
				}

				id.note(me+n+' entries removed.');
			}});

			// ------------------------------------------------------------------------------------- //
			// Storage aspects
			// ------------------------------------------------------------------------------------- //

			def({ name: 'spaceOf', method: function spaceOf(key)
			{
				// Allows a multi-space handling in one storage
				// by extending the key with a prefix.

				if (!space) return key;

				var prefix = space+Prefs.space.delimiter;

				if (key && key.indexOf(prefix) === 0) return key;
				if (!key ||id.isEmpty(key)) return prefix;

				return prefix+key;
			}});

			def({ name: 'encode', method: function encode(data)
			{
				// Works also for strings,
				// which are stored with double quotes.

				return JSON.stringify(data);
			}});

			def({ name: 'decode', method: function decode(string)
			{
				// Works also for strings,
				// which are stored with double quotes.

				return $.parseJSON(string);
			}});

			// ------------------------------------------------------------------------------------- //
			// Low Level Functions (abstract, to be overloaded)
			// ------------------------------------------------------------------------------------- //

			def({ name: 'store' });
			def({ name: 'fetch' });
			def({ name: 'remove' });
			def({ name: 'byIndex' });
			def({ name: 'sizeOf' });

			// ------------------------------------------------------------------------------------- //
			// Debug
			// ------------------------------------------------------------------------------------- //

			def({ name: 'dump', method: function dump(filter)
			{
				id.tell(me+'DUMP local storage'+(filter ? ' by filter "'+filter+'"' : '')+' ..');

				var result = this.query(filter);

				for (var i = result.length, n = 0; i--;)
				{
					var entry = this.fetch(result[i]);
					id.tell('- '+(id.isObject(entry) ? JSON.stringify(entry) : entry));

					n++;
				}

				id.tell(n+' entries found.');
			}});
		}});

		// ---------------------------------------------------------------------------------------- //
		// HTML5 Local Storage
		// ---------------------------------------------------------------------------------------- //

		classify({ name: 'LocalStorage', base: id.storage.Base, definition: function()
		{
			// The HTML5 Storage.

			var storage;

			def({ name: 'initialize', method: function(options)
			{
				options = options || {};

				this.callSuper(options);
				storage = options.temporary ? sessionStorage : localStorage;
			}});

			def({ name: 'store', method: function store(key, data) { return storage.setItem(this.spaceOf(key), this.encode(data)); }});
			def({ name: 'fetch', method: function fetch(key) { return this.decode(storage.getItem(this.spaceOf(key))); }});
			def({ name: 'remove', method: function remove(key) { return storage.removeItem(this.spaceOf(key)); }});
			def({ name: 'byIndex', method: function byIndex(i) { return storage.key(i); }});
			def({ name: 'sizeOf', method: function sizeOf() { return storage.length; }});
		}});

		// ---------------------------------------------------------------------------------------- //
		// HTML5 Database
		// ---------------------------------------------------------------------------------------- //

		classify({ name: 'Database', base: id.storage.Base, definition: function()
		{
			// The HTML5 SQL database.

			var storage;
			var space;
			var size;

			def({ name: 'initialize', method: function(options)
			{
				// At the moment ..
				// ...

				return this.error('Web Database NOT IMPLEMENTED yet!');

				// ...
				// later then.

				options = options || {};

				if (!window.openDatabase)
					return this.error('Browser doesn\'t support Web Database!');

				space = options.space || Prefs.database.name || Prefs.space.name;
				size  = options.size  || Prefs.database.size;

				storage = window.openDatabase('storage', '1.0', space, size);

				// ...
				// .....
			}});
		}});

		// ---------------------------------------------------------------------------------------- //
		// jQuery Plug-In "Store" (Internet Explorer ...)
		// ---------------------------------------------------------------------------------------- //

		classify({ name: 'GlobalStorage', base: id.storage.Base, definition: function()
		{
			// which offers a IE compatibility by using the "global storage"
			// but, unfortunately, not all functions (index).
			// Required: others/store.js.

			if (!store)
				return this.error('Missing plug-in "store.js"!');

			var storage = store;

			def({ name: 'store', method: function store(key, value) { return storage.set(this.spaceOf(key), this.encode(value)); }});
			def({ name: 'fetch', method: function fetch(key) { return this.decode(storage.get(this.spaceOf(key))); }});
			def({ name: 'remove', method: function remove(key) { return storage.remove(this.spaceOf(key)); }});
			def({ name: 'sizeOf', method: function sizeOf() { return storage.length; }});
		}});

		classify({ name:'MemoryStorage', base: id.storage.Base, definition: function()
		{
		 	var storage = {};

			def({ name: 'store', method: function store(key, value) { return storage[key] = value; }});
			def({ name: 'fetch', method: function fetch(key) { return storage[key] }});
			def({ name: 'remove', method: function remove(key) { delete storage[key] }});
			def({ name: 'sizeOf', method: function sizeOf()
			{
				var size = 0, key;
				for (key in storage){
					if (storage.hasOwnProperty(key)){
						size++;
					}
				}
				return size;
			}});
		}});
	}});

}());
