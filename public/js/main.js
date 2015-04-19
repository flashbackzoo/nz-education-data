(function () {
    var promise = $.get('/api');

    function createChart(data) {
        var totals = {
            name: 'Total subject enrolments',
            data: []
        };

        _.each(data, function (year) {
            var studentsEnrolledForYear = 0;

            _.each(year.schools, function (school) {
                _.each(school.subjects, function (numberOfEnrolments) {
                    if (numberOfEnrolments !== null) {
                        studentsEnrolledForYear += numberOfEnrolments;
                    }
                });
            });

            totals.data.push(studentsEnrolledForYear);
        });

        var chart = new Chartist.Line('.ct-chart', {
            labels: _.keys(data),
            series: [totals]
        },{
            fullWidth: true,
            chartPadding: {
                right: 40
            },
            lineSmooth: false
        });
    }

    function addToolTips() {
        var $chart = $('.ct-chart');

        var $toolTip = $chart
            .append('<div class="tooltip"></div>')
            .find('.tooltip')
            .hide();

        $chart.on('mouseenter', '.ct-point', function () {
            var $point = $(this),
                value = $point.attr('ct:value'),
                seriesName = $point.parent().attr('ct:series-name');

            $toolTip.html(seriesName + '<br>' + value).show();
        });

        $chart.on('mouseleave', '.ct-point', function () {
            $toolTip.hide();
        });

        $chart.on('mousemove', function (event) {
            $toolTip.css({
                left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
                top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
            });
        });
    }

    promise.done(function (data) {
        createChart(data);
        addToolTips();
    });

}());
