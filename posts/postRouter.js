const express = 'express';
const db = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
    db.get()
        .then(posts => res.status(200).json(posts))
        .catch(err =>
            res.status(500)
                .json({ error: `The posts information could not be retrieved ${err}` })
        );
});

router.get('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    db.getById(id)
        .then(posts => res.status(200).json(posts))
        .catch(err =>
            res.status(500)
                .json({ error: `The posts information could not be retrieved ${err}` })
        );
});

router.delete('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(
            post ? res.status(200).json(post) : res.status(404)
                .json({ message: "The post with the specified ID does not exist." })
        )
        .catch(err =>
            res.status(500).json({ error: "The post could not be removed." })
        );
});

router.put('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!id)
        res.status(404)
            .json({ message: "The post with the specified ID dose not exist." });
    if (!title || !contents)
        res.status(400)
            .json({
                errorMessage: "Please provide title and contents for the post."
            });
    const updatePost = { title, contents };
    db.update(id, updatePost)
        .then(response =>
            response ? res.status(200).json(response) : res.status(404)
                .json({ message: "The post with the specified ID does not exist." })
        )
        .catch(err =>
            res.status(500)
                .json({ error: "The post information could not be modified." })
        )
});

// custom middleware

async function validatePostId(req, res, next) {
    try {
        const post = await db.getById(req.params.id);
        if (post) {
            req.post = post;
            next();
        } else {
            res.status(404).json({ message: "Invalid post id." })
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to process request" });
    }
};

module.exports = router;