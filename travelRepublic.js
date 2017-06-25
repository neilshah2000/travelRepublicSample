(function(){
    $.get('hotels.json').then(createWidgets);
    
    function preprocessData(data){
        data.forEach(function(item){
            item.Distance = Math.round(item.Distance);
        })
        return data;
    }

    function createWidgets(data){
        var establishments,
            dataSource,
            sortOptions;

        establishments = data.Establishments;

        dataSource = new kendo.data.DataSource({
            data: establishments,
            schema: {
                parse: function(data){
                    return preprocessData(data);
                },
                model: {
                    fields: {
                        Distance: { type: 'number' },
                        EstablishmentId: { type: 'number' },
                        EstablishmentType:  {type: 'string' },
                        Location:  {type: 'string' },
                        MinCost: { type: 'number' },
                        Name: { type: 'string' },
                        Stars: { type: 'number' },
                        UserRating: { type: 'number' },
                        UserRatingTitle: { type: 'string' },
                        UserRatingCount: { type: 'number' },
                        ImageUrl: { type: 'string' },
                        ThumbnailUrl: { type: 'string' }
                    }
                }
            },
            pageSize: 10
        });

        sortOptions = [{
                text:'Distance Asc',
                value: { field: 'Distance', dir: 'asc' }
            },{
                text: 'Distance Desc',
                value: { field: 'Distance', dir: 'desc' }
            }, {
                text: 'Stars Asc',
                value: { field: 'Stars', dir: 'asc' }
            }, {
                text: 'Stars Desc',
                value: { field: 'Stars', dir: 'desc' }
            }, {
                text: 'Min Cost Asc',
                value: { field: 'MinCost', dir: 'asc' }
            }, {
                text: 'Min Cost Desc',
                value: { field: 'MinCost', dir: 'desc' }
            }, {
                text: 'User Rating Asc',
                value: { field: 'UserRating', dir: 'asc' }
            }, {
                text: 'User Rating Desc',
                value: { field: 'UserRating', dir: 'desc' }
            }]

        $('#sortList').kendoDropDownList({
            dataSource: {
                data: sortOptions
            },
            dataTextField: "text",
            dataValueField: "value",
            select: function(e) {
                dataSource.sort({ field: e.dataItem.value.field, dir: e.dataItem.value.dir });
            }
        });

        $('#kendoNameFilter').kendoFilterMenu({
            dataSource: dataSource,
            field: 'Name',
            operators:{
                string:{
                    contains: 'contains'
                }
            },
            extra: false
        });

        $('#kendoStarsFilter').kendoFilterMenu({
            dataSource: dataSource,
            field: 'Stars',
            extra: false
        });

        $('#kendoUserRatingFilter').kendoFilterMenu({
            dataSource: dataSource,
            field: 'UserRating',
            extra: false
        });

        $('#kendoMinCostFilter').kendoFilterMenu({
            dataSource: dataSource,
            field: 'MinCost',
            extra: false
        });

        $("#listView").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#template").html())
        });

        $("#pager").kendoPager({
            dataSource: dataSource
        });
    }
})()

// Travel Republic Front End Dev Technical Test
// ============================================

// Take the attached data set hotels.json and write a web page (or simple set of pages) to present the data. 

// The result set is reasonably large so we need to be be able to filter the data by:

// * Name
// * Stars
// * TrpRating
// * UserRating
// * MinCost

// and sort the data by:

// * Distance
// * Stars
// * MinCost
// * TrpRating
// * UserRating

// Things to consider - performance, efficient use of space, usability, cross-browser, responsiveness.

// You can use whatever server side technology you like (or none at all if you think that�s appropriate). 
// Just give us some instructions if you use anything *really* eccentric. 

// You can use whatever frameworks or libraries you like, but be prepared to justify your use of them.

// You should aim to get this test back to us within a day but there is no precise time limit. 


