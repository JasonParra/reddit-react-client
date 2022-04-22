const REPLY = {
    "kind": "t1",
    "data": {
        "subreddit_id": "t5_m0bnr",
        "approved_at_utc": null,
        "author_is_blocked": false,
        "comment_type": null,
        "edited": false,
        "mod_reason_by": null,
        "banned_by": null,
        "ups": 1,
        "num_reports": null,
        "author_flair_type": "text",
        "total_awards_received": 0,
        "subreddit": "nextlevel",
        "author_flair_template_id": null,
        "likes": true,
        "replies": "",
        "user_reports": [],
        "saved": false,
        "id": "i610j64",
        "banned_at_utc": null,
        "mod_reason_title": null,
        "gilded": 0,
        "archived": false,
        "collapsed_reason_code": null,
        "no_follow": false,
        "author": "jasonparra96",
        "can_mod_post": false,
        "created_utc": 1650823346.0,
        "send_replies": true,
        "parent_id": "t1_i52xcvy",
        "score": 1,
        "author_fullname": "t2_m14pw6f0",
        "report_reasons": null,
        "approved_by": null,
        "all_awardings": [],
        "collapsed": false,
        "body": "example of a comment 2",
        "awarders": [],
        "top_awarded_type": null,
        "author_flair_css_class": null,
        "author_patreon_flair": false,
        "downs": 0,
        "author_flair_richtext": [],
        "is_submitter": false,
        "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;example of a comment 2&lt;/p&gt;\n&lt;/div&gt;",
        "removal_reason": null,
        "collapsed_reason": null,
        "associated_award": null,
        "stickied": false,
        "author_premium": false,
        "can_gild": false,
        "gildings": {},
        "unrepliable_reason": null,
        "author_flair_text_color": null,
        "score_hidden": false,
        "permalink": "/r/nextlevel/comments/u5n7js/her_mom_completed_candy_crush/i610j64/",
        "subreddit_type": "public",
        "locked": false,
        "name": "t1_i610j64",
        "created": 1650823346.0,
        "author_flair_text": null,
        "treatment_tags": [],
        "rte_mode": "markdown",
        "link_id": "t3_u5n7js",
        "subreddit_name_prefixed": "r/nextlevel",
        "controversiality": 0,
        "author_flair_background_color": null,
        "collapsed_because_crowd_control": null,
        "mod_reports": [],
        "mod_note": null,
        "distinguished": null
    }
};

export const buildReply = () => REPLY;

export const buildCreateReplyResponse = () => ({
    "jquery": [
        [
            0,
            1,
            "call",
            [
                "body"
            ]
        ],
        [
            1,
            2,
            "attr",
            "find"
        ],
        [
            2,
            3,
            "call",
            [
                ".status"
            ]
        ],
        [
            3,
            4,
            "attr",
            "hide"
        ],
        [
            4,
            5,
            "call",
            []
        ],
        [
            5,
            6,
            "attr",
            "html"
        ],
        [
            6,
            7,
            "call",
            [
                ""
            ]
        ],
        [
            7,
            8,
            "attr",
            "end"
        ],
        [
            8,
            9,
            "call",
            []
        ],
        [
            1,
            10,
            "attr",
            "find"
        ],
        [
            10,
            11,
            "call",
            [
                "textarea"
            ]
        ],
        [
            11,
            12,
            "attr",
            "attr"
        ],
        [
            12,
            13,
            "call",
            [
                "rows",
                3
            ]
        ],
        [
            13,
            14,
            "attr",
            "html"
        ],
        [
            14,
            15,
            "call",
            [
                ""
            ]
        ],
        [
            15,
            16,
            "attr",
            "val"
        ],
        [
            16,
            17,
            "call",
            [
                ""
            ]
        ],
        [
            1,
            18,
            "attr",
            "remove"
        ],
        [
            18,
            19,
            "call",
            []
        ],
        [
            0,
            20,
            "attr",
            "things"
        ],
        [
            20,
            21,
            "call",
            [
                "t1_i52xcvy"
            ]
        ],
        [
            21,
            22,
            "attr",
            "find"
        ],
        [
            22,
            23,
            "call",
            [
                ".reply-button:first"
            ]
        ],
        [
            23,
            24,
            "attr",
            "show"
        ],
        [
            24,
            25,
            "call",
            []
        ],
        [
            25,
            26,
            "attr",
            "text"
        ],
        [
            26,
            27,
            "call",
            [
                "replied"
            ]
        ],
        [
            27,
            28,
            "attr",
            "end"
        ],
        [
            28,
            29,
            "call",
            []
        ],
        [
            0,
            30,
            "attr",
            "insert_things"
        ],
        [
            30,
            31,
            "call",
            [
                [
                    buildReply()
                ],
                false
            ]
        ],
        [
            0,
            32,
            "call",
            [
                "#noresults"
            ]
        ],
        [
            32,
            33,
            "attr",
            "hide"
        ],
        [
            33,
            34,
            "call",
            []
        ]
    ],
    "success": true
});
