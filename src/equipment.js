var equipment = {}

var id = 1000;

var gtbg = 'Sahlgrenska'

function mkEquipment(data){
    data.id = id;
    id = id +1;
    data.from = data.from || gtbg;
    equipment[data.id] = data;
}

function getEquipment() {
    return equipment;
}



function init() {
    
    mkEquipment( { index:'1',
                 date:'2020-04-12',
                 equipment:'Respirators', 
                 quantity:'4',
                  status:'ORDERED'})

    mkEquipment( { index:'2',
                             date:'2020-04-13',
                             equipment:'Masks',
                             quantity:'500',
                             status:'REJECTED'})
    mkEquipment( { index:'3',
                                          date:'2020-04-12',
                                          equipment:'Robes',
                                          quantity:'200',
                                         status:'ACCEPTED'})
    mkEquipment( { index:'4',
                                                       date:'2020-04-13',
                                                       equipment:'Doctors',
                                                       quantity:'10',
                                                     status:'ACCEPTED'})
    mkEquipment( { index:'4',
                                                                    date:'2020-04-13',
                                                                    equipment:'Nurses',
                                                                    quantity:'30',
                                                                 status:'ACCEPTED'})
}

init();

module.exports = {
    getEquipment: getEquipment
}
    
