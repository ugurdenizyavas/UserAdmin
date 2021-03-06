/*
 File: 
 Date: 05.06.12 16:20
 Author: Information Design
 Purpose: 

 Last Change: $Date$ by $Author$
 Version: $Revision$
 */

(function()
{
	// ---------------------------------------------------------------------------------------------- //
	// Vocabulary
	// ---------------------------------------------------------------------------------------------- //

	var css = { isAbout: 'isAbout', label: 'label', text: 'text', clear: 'clearfix', more: 'more' };
	var cos = { about: 'about', mail: 'email', homepage: 'homepage' };
	var my = { name:'about' };
	var system;

	// ---------------------------------------------------------------------------------------------- //
	// Class
	// ---------------------------------------------------------------------------------------------- //

	module({ ns:'id.gui', definition:function()
	{
		classify({name:'About', definition:function()
		{
			def({name:'initialize', method:function initialize(name)
			{
				id.object.register(this, { name:name, docType: css.isAbout, cosType: cos.about });
			}});

			def({name:'init', method:function init(obj)
			{
				if(system) {
					$.each(system.items, function(i, item) {
						item.label = id.lang.get(item.id);
					});
					obj.items.push(system);
				}

				show(obj);
			}});

			def({name:'update', method:function update(obj)
			{
				this.init(obj);
			}});

			def({name:'setSystem', method:function setSystem(obj)
			{
				system = {
					id: "release",
					label: "Release",
					items: [
						{
							id: "revision",
							value: obj.revision
						},
						{
							id: "version",
							value: obj.version
						},
						{
							id: "date"
						},
						{
							id: "stage",
							value: obj.environment
						}
					]
				}
			}});

			function show(obj)
			{
				var lang = id.lang.getLang();

				id.layout.setContainer(obj.getPlace(), false);

				if (obj.items) $.each(obj.items, function(i, item)
				{
					var op, opPlace, more;

					op = obj.items[i];
					op.$place = obj.getPlace();
					op.id = id.cos.jQueryID(op.id);
					opPlace = op.$place.find('#'+op.id);

					if (item.label)
						item.label = item.label[lang] || item.label;
					else
						item.label = item.id;

					if (item.label) opPlace.children('h2').empty().append(item.label);

					if (item.items) $.each(item.items, function(j, entry)
					{
						var ip, ipPlace;

						ip = item.items[j];
						ip.id = id.cos.jQueryID(ip.id);
						ipPlace = op.$place.find('#'+ op.id +' #'+ ip.id);
						if (entry.label)
							entry.label = entry.label[lang] || entry.label;
						else
							entry.label = entry.id;

						if (entry.id == cos.mail)
						{
							if (entry.label) ipPlace.find('span.' + css.label).empty().append(entry.label).append(':');
							if (entry.value) ipPlace.find('span.' + css.text).children('a').empty().append(entry.value).attr('href', 'mailto:'+entry.value);
						}
						else if (entry.id == cos.homepage)
						{
							if (entry.label) ipPlace.find('span.' + css.label).empty().append(entry.label).append(':');
							if (entry.value) ipPlace.find('span.' + css.text).children('a').empty().append(entry.value).attr('href', entry.value).attr('target', '_blank');
						}
						else
						{
							if (entry.label) ipPlace.find('span.'+css.label).empty().append(entry.label).append(':');
							if (entry.value) ipPlace.find('span.'+css.text).empty().append(entry.value);
						}
					});

					more = op.$place.find('#'+css.more+'-'+item.id);

					var cache = '';

					if (item.link)
					{
						cache += '<p class="'+ css.clear +'">';
						cache += '<span class="'+css.text+'"><a target="_blank" href="'+(this.link.url ? this.link.url : this.link)+'">'+(this.link.url ? this.link.url : this.link)+'</a></span></p>';
					}

					more.html(cache);
				});

			}
		}});

	}});

	// ---------------------------------------------------------------------------------------------- //
	// Static Renderer
	// ---------------------------------------------------------------------------------------------- //

	id.gui.about = new id.gui.About(my.name);
}()); 