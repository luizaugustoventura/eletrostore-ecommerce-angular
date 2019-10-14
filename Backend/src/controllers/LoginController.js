const Person = require('../models/Person');

module.exports = {
    async login(req, res) {
        if(req.body.email && req.body.password) {
            const person = await Person.findOne({
                $and: [
                    { email: req.body.email }, 
                    { password: req.body.password }
                ]
            })
            .then(prsn => {
                if(prsn._id) {
                    const logged = {
                        _id: prsn._id,
                        name: prsn.name,
                        email: prsn.email,
                        admin: prsn.admin
                    };

                    return res.status(200).json({
                        success: true,
                        person: logged
                    });
                }
            })
            .catch(error => {
                console.log(error);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            });
        }

        
    },

    async store(req, res) {
        const person = req.body;

        const inUse = await Person.find({
            email: person.email
        });

        if(inUse == '') {
            const pers = await Person.create(person)
            .then(() => {
                return res.json({ 
                    success: true,
                    personId: pers._id 
                });
            })
            .catch((error) => {
                console.log(error);
                return res.json({ 
                    success: false,
                    message: 'Failed to add Person' 
                });
            });
        }
        
        return res.status(400).json({
            success: false,
            message: 'E-mail already in use'
        });
    },

    update(req, res) {
        if(req.body) {
            const person = req.body;
            
            Person.updateOne(
                { _id: person._id }, 
                {
                    name: person.name,
                    email: person.email,
                    password: person.password,
                    address: person.address,
                    number: person.number,
                    neighborhood: person.neighborhood,
                    city: person.city,
                    state: person.state,
                    zipCode: person.zipCode
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
                            message: 'Falied at updating person'
                        });
                    }
                }
            );

        }
    },

    delete(req, res) {
        if(req.body._id) {
            Person.deleteOne({ _id: req.body._id })
            .then(person => {
                return res.status(200).json({
                    success: true,
                    perosnId: person._id
                });
            })
            .catch(() => {
                return res.status(500).json({
                    success: false,
                    message: 'Could not delete person'
                });
            });
        }
    }
}