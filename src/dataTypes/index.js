/**
 * artist
 * @typedef Artist
 * @property {string} id
 * @property {string} image
 * @property {string} profileName
 * @property {string} profileTagId
 * @property {string} is_following
 * @property {string} facebook
 * @property {string} instagram
 * @property {string} tiktok
 * @property {string} dribble
 * @property {string} noOfFollowers
 * @property {string} noOfFollowing
 */

/**
 * Post // single post item
 * @typedef Post
 * @property {string} id
 * @property {string} art
 * @property {string} thumbnail
 * @property {string} uri
 */

/**
 * Feed. Contains multiple posts
 * @typedef Feed
 * @property {string} id
 * @property {Artist{}} artist
 * @property {string} description
 * @property {string} long_description
 * @property {string} price
 * @property {string} title
 * @property {array} sizes
 * @property {boolean} is_my_post
 * @property {boolean} sellable
 * @property {string} noOfFollowers
 * @property {Post[]} resources
 */

/**
 * single community item
 * @typedef Community
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {string} type
 * @property {string} uri
 */

/**
 * Credit card
 * @typedef CreditCard
 * @property {string} id
 * @property {string} brand
 * @property {boolean} complete
 * @property {string} country
 * @property {number} expiryMonth
 * @property {number} expiryYear
 * @property {string} last4
 * @property {string} postalCode
 * @property {boolean} isSelected
 */

/**
 * @typedef User
 * @property {string} id
 * @property {string} user_id
 * @property {string} name
 * @property {string} username
 * @property {string} profile_image
 */

/**
 * CommentObj
 * @typedef CommentObj
 * @property {string} parent_id
 * @property {string} id
 * @property {User{}} user
 * @property {string} art_id
 * @property {string} collection_id
 * @property {boolean} is_my_comment
 * @property {string} created_at
 * @property {boolean} liked
 * @property {number} no_of_likes
 * @property {string} body
 */

/**
 * Vibes
 * @typedef Vibes
 * @property {string} id
 * @property {string} title
 * @property {string} image
 *
 */

/**
 * Collection
 * @typedef Collection
 * @property {string} id
 * @property {string} title
 * @property {string} image
 * @property {boolean} is_public
 * @property {boolean} is_my_collection
 * @property {boolean} is_pinned
 * @property {boolean} is_pin_privacy_public
 * @property {string} pin_like_count
 * @property {Artist{}} artist
 *
 */
