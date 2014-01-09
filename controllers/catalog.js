/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-6
 * Time: PM9:48
 * To change this template use File | Settings | File Templates.
 */

var Catalog = require('../models/catalog.js');

var catalog = {
    /***
     * Create a catalog
     *
     * @param req
     * @param res
     */
    post : function(req, res, next) {
        var name = req.body.name;

        var description = req.body.description;

        var parentId = req.body.parentId;

        var data = {
            name: name,
            description: description,
            parentId : parentId
        };
        new Catalog(data).save(function(err, catalog){
            if(err) return next(err);

            return res.json({
                id: catalog._id
            });
        });
    },


    /***
     * List all catalogs
     *
     * @param req
     * @param res
     */
    list : function(req, res, next){
        Catalog.find(function(err, catalogs) {
            if(err) return next(err);

            res.json(catalogs);
            res.end();
        });
    },


    /***
     * Get catalog details
     *
     * @param req
     * @param res
     */
    get : function(req, res){
        var id = req.params.id;


        Catalog.findById(id,function(err, catalog){
            if(err) throw err;

            res.json(catalog);
            res.end();
        });
    },


    /***
     * Delete a catalog
     *
     * @param req
     * @param res
     */
    delete : function(req, res){

        var id = req.params.id;

        Catalog.findById(id,function(err, catalog){

            if(err) throw err;

            catalog.remove();

            res.end();

        });
    },


    /***
     * Modify a catalog
     *
     * @param req
     * @param res
     */
    put : function(req, res){

        var id = req.params.id;

        var name = req.body.name;

        var description = req.body.description;

        var parentId = req.body.parentId;

        Catalog.findById(id,function(err, catalog){
            if(err) throw err;

            catalog.name = name;

            catalog.description = description;

            if(parentId) catalog.parentId = parentId;

            catalog.save(function(err, catalog){
                if(err) throw err;

                res.json(catalog._id);
                res.end();
            });

        });
    }

};

module.exports = catalog;