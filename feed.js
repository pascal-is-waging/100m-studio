let openstudios = []

let channels = []
let count = 0

let check = () => count == openstudios.length ? hydrate() : null

// if doesn't hydrate in 5 sec just call hydrate...
let timeout = setTimeout(hydrate, 5000)

function init(){
	// get channels, when all done hydrate
	openstudios.forEach(slug => {
		getchannel(slug).then((res) => {
			channels.push(res)
			count++
			check()
		})
	})
}

async function getchannel(slug) {
	let cache = localStorage.getItem(slug)
	if (cache){
		cache = JSON.parse(cache)
		let now = new Date((new Date()).toString()).getTime()/1000
		let cachetime =  new Date(cache.time).getTime()/1000 
		console.log("now", now, "cachetime", cachetime, now - cachetime)
		if (now - cachetime > 60 * 5){console.log("been a min so will continue to load")}
		else {
			console.log("returning cache")
			return cache
		}
	}

	return await fetch("https://api.are.na/v2/channels/"+slug+"?per=50")
		.then(res => res.json())
		.then(res => {
			res.time = new Date().toString() 
			localStorage.setItem(slug, JSON.stringify(res))
			return res
		})
}

function hydrate(){
	clearTimeout(timeout)
	let root = document.querySelector( ".header-right-alter-gallery")
	root.innerHTML = ``
	// give channels date
	channels.forEach((c) => {
		let title  = c.title
		let [year, month, day] = title.split(" ").pop().split("/")
		c.date = new Date(`${month}/${day}/${year}`)
	})

	// sort channels according to date

	channels.sort((a, b) => {
		return (b.date - a.date)
	})

	channels.forEach((channel) => {
		if (!channel.contents) return
		let html = `<div class="channel-container">`
		html += `
<a target="_blank" href="https://are.na/channels/${channel.slug}">
		<div><h2 class="block-title">${channel.date.toDateString()}</h2></div>
</a>`

		let links = channel.contents.filter(b => b.class == "Link")
		let images = channel.contents.filter(b => b.class == "Image")
		let b_channels = channel.contents.filter(b => b.class == "Channel")

		if (links.length > 0 || b_channels.length > 0) html+=`<p class="comment">Links</p>`
		b_channels.forEach((block) => {
			html+=`<p class="link"><a target="_blank" href="https://are.na/channels/${block.slug}"><span class="arena">Are.na</span><span class="channel">${block.title}</span></a><p>`
		})

		links.forEach((block) => {
			html+=`<p class="link"><a  target="_blank" href="${block.source.url}">${block.title}</a><p>`
		})


		html += `<div class="working-img feed">`
					
		// randomize a lot
		channel.contents.sort((c) => Math.random() > .5 ? 1 : -1)
		channel.contents.sort((c) => Math.random() > .5 ? 1 : -1)
		channel.contents.sort((c) => Math.random() > .5 ? 1 : -1)
		channel.contents.sort((c) => Math.random() > .5 ? 1 : -1)
		channel.contents.sort((c) => Math.random() > .5 ? 1 : -1)

		images.slice(0,10).forEach((block) => {
			html+=`
<a target="_blank" href="https://are.na/block/${block.id}">
	<img class="block-img-working" src="${block.image.display.url}"></img>
</a>`
		})

		if (images.length == 0) html+=`<p class="comment">no images from this open studio :(</p>`


		html+=`</div>`

		html+=`</div>`

		root.innerHTML += html
	})
}

getchannel("open-studios-pg8dbivxrti")
	.then((res) => res.contents.forEach(c => c.class == "Channel" ? openstudios.push(c.slug) : null))
	.then(init)


