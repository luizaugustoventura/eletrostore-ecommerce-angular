const Person = require('../models/Person');
const Sale = require('../models/Sale');

module.exports = {
    index(req, res) {
        Person.find({
            admin: false
        })
        .then(ppl => {
            return res.status(200).json(ppl);
        })
        .catch(error => {
            console.log(error);
            return res.status(404).json({
                succes: false,
                message: 'Could not list people'
            });
        });
    },

    find(req,res) {
        if(req.query.id)
        {
            Person.findById(req.query.id)
            .then((prs) =>  {
                return res.json({
                    success: true,
                    person: prs
                });
            })
            .catch((error) => {
                console.log(error);
                return res.status(404).json({
                    success: false, 
                    message: 'Could not find person' 
                });
            });
        }
    },

    async store(req, res) {
        const person = req.body;

        await Person.create(person)
        .then(() => {
            return res.json({ 
                success: true,
                personId: person._id 
            });
        })
        .catch((error) => {
            console.log(error);
            return res.json({ message: 'Failed to add Person' });
        });
    },

    async update(req, res) {

        const person = req.body;

        Person.updateOne(
            { _id: person._id },
            { $set: {
                    name: person.name, 
                    email: person.email, 
                    password: person.password, 
                    address: person.address,
                    number: person.number,
                    city: person.city,
                    state: person.state,
                    zipCode: person.zipCode,
                    neighborhood: person.neighborhood
                } 
            },
            { upsert: true },
            (error) => {
                if(!error) {
                    return res.status(200).json({
                        success: true,
                        personId: person._id
                    });
                }
                else {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error at updating user'
                    });
                }
            } 
        );
        
    },

    async delete(req, res) {
        if (req.body._id) {
            const activeUser = await Sale.findOne({
                customerId: req.body._id
            }); 

            if(!activeUser) { //Remove de fato o usuário
                Person.deleteOne({ _id: req.body.id })
                .then(person => {
                    return res.status(200).json({
                        success: true,
                        personId: person._id
                    });
                })
                .catch(error => {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: 'Could not delete person'
                    });
                });
            }
            else { //Desativa o usuário
                //targetUser = await Person.findById(req.body._id);

                Person.updateOne(
                    { _id: req.body._id },
                    { $set: {
                            disabled: true,
                        } 
                    },
                    { upsert: true },
                    (error) => {
                        if(!error) {
                            return res.status(200).json({
                                success: true,
                                personId: req.body._id
                            });
                        }
                        else {
                            console.log(error);
                            return res.status(500).json({
                                success: false,
                                message: 'Error at deactivating person'
                            });
                        }
                    }
                );

            }
        }
    }
}