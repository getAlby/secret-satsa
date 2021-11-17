<?php

header('Access-Control-Allow-Origin: *');

include "twitteroauth/twitteroauth.php";

$consumer_key = "";
$consumer_secret = "";
$access_token = "";
$access_token_secret = "";

$twitter = new TwitterOAuth($consumer_key,$consumer_secret,$access_token,$access_token_secret);
$twitter->decode_json = FALSE;
$tweets = $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=' . htmlspecialchars(urlencode($_GET["q"])) . '&result_type=recent');

print_r($tweets);

?>