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
    $('.path-finder-target').text(response.join(' => '));
}