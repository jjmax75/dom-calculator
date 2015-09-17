$(function() {
    $( "#individual .range" ).slider({
        range: true,
        animate: true,
        step: 5,
        min: 0,
        max: 100,
        values: [ 65, 95 ],
        slide: function( event, ui ) {
            $( ".rangeVals" ).html( ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );
            $lower = ui.values[ 0 ];
            $higher = ui.values[ 1 ];
            calculate();
        }
    }).slider("pips", {rest: "label"});
    
    $lower = 65;
    $higher = 95;
    
    $( "#individual .rangeVals" ).html( $( "#individual .range" ).slider( "values", 0 ) + "% - " + $( "#individual .range" ).slider( "values", 1 ) + "%" );
    
    $('#individual #weight').on('input', function() {
        calculate();
    });
    
});

$(function() {
    $( "#class .weight" ).slider({
        animate: true,
        step: 5,
        min: 0,
        max: 100,
        value: 95,
        slide: function( event, ui ) {
            $( "#class .percentageVal" ).html( ui.value + "%" );
            calculateClass(ui.value);
        }
    }).slider("pips", {rest: "label"});
    
    $( '#classNumbers' ).on('click', 'tr:last', function(event) {
        $('#classNumbers tr:last').after('<tr><td width="50%"><input type="number" class="classWeight" placeholder="What weight Jabroni?"></td><td class="classResult"></td></tr>');
    });
    
    $( "#class .percentageVal" ).html( $( "#class .weight" ).slider( "value" ) + "%" );
    
    $('#classNumbers').on('input', function() {
        var percentage = $( "#class .weight" ).slider( "value" );
        calculateClass(percentage);
    });
    
    $('.classBtn').click(function() {
       $('body').attr('id', 'groupClass');     
    });
    
    $('.individualBtn').click(function() {
       $('body').attr('id', 'individualAthlete');     
    });
    
});
    
function calculate() {
    var $weight = $('#individual #weight').val();
    
    if ($weight == undefined || $weight == '' || isNaN($weight) ) {
        $weight = 0;
    }
    
    var $rangeStep = ($higher - $lower) / 5;
    
    var $outputTable = "<table><tr>";
    
    for (i=0; i<=$rangeStep; i++) {
        $outputTable += "<th>" + ($lower + 5 * i) + "%</th>";
    }
    
    $outputTable += "</tr><tr>";
    
    for (i=0; i<=$rangeStep; i++) {
        $outputTable += "<td>" + Math.round($weight * ($lower + 5 * i) / 100 ) + "</td>";
    }
    
    $outputTable += "</tr></table>";
    
    $( "#individual #numbers" ).html( $outputTable );
    
}

function calculateClass(percentage) {
    
    $("#classNumbers > tbody > tr").each(function(i, tr) {
        
        var weight = $("input.classWeight", tr).val();
        $("td.classResult", tr).html(Math.round(weight * percentage / 100 ));
    })
}

(function ($) {
	$(document).on('change keydown keypress input', 'td[data-placeholder]', function() {
		if (this.textContent) {
			this.dataset.divPlaceholderContent = 'true';
		}
		else {
			delete(this.dataset.divPlaceholderContent);
		}
	});
})(jQuery);