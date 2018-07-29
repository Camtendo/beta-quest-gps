$('.path-finder-btn').click(() => {
    var transformedState = {};
    for (let node of mapState) {
        var transformedZones = {};
        for (let zone of node.zones) {
            if (zone.destination) {
                // TODO Perform logic for weighting here
                transformedZones[zone.destination] = 1;
            }
        }

        if (Object.keys(transformedZones).length) {
            transformedState[node.id] = transformedZones;
        }        
    }

    $.ajax({
        url: '/path-finder',
        type: 'post',
        data: JSON.stringify({
            mapState: transformedState, 
            source: $('.path-finder-start').val(), 
            destination: $('.path-finder-end').val()
        }),
        contentType: 'application/json'

    }).done((response) => {
        resolvePathResult(response);
    });
});

function resolvePathResult(response) {
    if (response == null) {
        $('.path-finder-target').text(`No path exists from ${$('.path-finder-start').val() || 'EMPTY'} to ${$('.path-finder-end').val() || 'EMPTY'}`);
        return;
    }

    var zoneNameList = [];
    for (let i = 0; i < response.length; i++) {
        if (i+1 >= response.length) {
            break;
        }

        var node = getNode(mapState, response[i]);
        var zone = node.zones.filter(z => {return z.destination === response[i+1];});
        zoneNameList.push(zone[0].id);
    }

    var newArray = response.map((d, index) => {
        if (index >= zoneNameList.length) {
            return d;
        }

        return `${d} => ${zoneNameList[index]}`;
    });

    var orderedList = newArray.map(i => {
        return `<li>${i}</li>`;
    })

    const html = `<ol>${orderedList.join('')}</ol>`;
    $('.path-finder-target').html(html);
}