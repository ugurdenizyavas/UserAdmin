/*
	File: tiles.js
	Purpose: Process/Task pattern as tiles.
	
	$Author: udy $
*/

(function()
{
	// ---------------------------------------------------------------------------------------------- //
	// Public Interface
	// ---------------------------------------------------------------------------------------------- //

	id.gui.tiles = 
	{ 
		init: init,
		update: init /* no difference yet */
	};

	// ---------------------------------------------------------------------------------------------- //
	// Init
	// ---------------------------------------------------------------------------------------------- //
	
	function init(obj)
	{
		for (var i = 0, tasks = obj.items; tasks && i < tasks.length)
			for (var j = 0, items = tasks[i].items; items && i < items.length)
			{
				// TODO
				// Move to Elements Dispatcher
			
				var item = items[j];
			
				switch (item.type)
				{
					case cos.table      : id.gui.table.init(item); break;
					case cos.chart      : id.gui.chart.init(item); break;
					case cos.text       : id.gui.text.init(item); break;
					case cos.number     : id.gui.number.init(item); break;
					case cos.time       : id.gui.time.init(item); break;
					case cos.flag       : id.gui.flag.init(item); break;
					case cos.index      : id.gui.index.add(item); break;
					case cos.image      : id.gui.image.init(item); break;
					case cos.swapSelect : id.gui.swapSelect.init(item); break;
					case cos.select 	  : id.gui.newSelect.init(item); break;
					case cos.radio      : id.gui.radio.init(item); break;
					case cos.check      : id.gui.check.init(item); break;
					case cos.checkSelect: id.gui.checkSelect.init(item); break;
					case cos.upload     : id.gui.upload.set(item); break;
	
					case undefined: id.gui.value.set(item); break;
				}
			}
	}
	
}());