const { NlpManager } = require('node-nlp');

const enNLP = new NlpManager({ languages: ['en'], nlu: { log: false, useNoneFeature: true } });
const viNLP = new NlpManager({ languages: ['vi'], nlu: { log: false, useNoneFeature: true } });
// Adds the utterances and intents for the NLP
//-----------------bye-----------------
//---en---
enNLP.addDocument('en', 'goodbye for now', 'en.greetings.bye');
enNLP.addDocument('en', 'bye bye take care', 'en.greetings.bye');
enNLP.addDocument('en', 'okay see you later', 'en.greetings.bye');
enNLP.addDocument('en', 'bye for now', 'en.greetings.bye');
enNLP.addDocument('en', 'i must go', 'en.greetings.bye');
enNLP.addDocument('en', 'bye', 'en.greetings.bye');
//---vi---
viNLP.addDocument('vi', 'bây giờ tôi phải đi', 'vi.greetings.bye');
viNLP.addDocument('vi', 'bảo trọng', 'vi.greetings.bye');
viNLP.addDocument('vi', 'hẹn gặp lại', 'vi.greetings.bye');
viNLP.addDocument('vi', 'tạm biệt', 'vi.greetings.bye');
viNLP.addDocument('vi', 'bye', 'vi.greetings.bye');


//-----------------hello-----------------
//---en---
enNLP.addDocument('en', 'hello', 'en.greetings.hello');
enNLP.addDocument('en', 'hi', 'en.greetings.hello');
enNLP.addDocument('en', 'howdy', 'en.greetings.hello');
enNLP.addDocument('en', 'hey', 'en.greetings.hello');
enNLP.addDocument('en', 'nice to meet you', 'en.greetings.hello');
//---vi---
viNLP.addDocument('vi', 'hello', 'vi.greetings.hello');
viNLP.addDocument('vi', 'hi', 'vi.greetings.hello');
viNLP.addDocument('vi', 'xin chào', 'vi.greetings.hello');
viNLP.addDocument('vi', 'chào', 'vi.greetings.hello');
viNLP.addDocument('vi', 'rất vui được gặp bạn', 'vi.greetings.hello');


//-----------------information-----------------
//*******address*******
//---en---
enNLP.addDocument('en', 'address', 'en.information.address');
enNLP.addDocument('en', 'where is address', 'en.information.address');
enNLP.addDocument('en', 'location', 'en.information.address');
enNLP.addDocument('en', 'where is location', 'en.information.address');
enNLP.addDocument('en', 'where', 'en.information.address');
//---vi---
viNLP.addDocument('vi', 'địa chỉ', 'vi.information.address');
viNLP.addDocument('vi', 'ở đâu', 'vi.information.address');
viNLP.addDocument('vi', 'địa chỉ ở đâu', 'vi.information.address');
viNLP.addDocument('vi', 'tọa lạc', 'vi.information.address');
viNLP.addDocument('vi', 'địa điểm', 'vi.information.address');

//*******name*******
//---en---
enNLP.addDocument('en', 'what name', 'en.information.name');
enNLP.addDocument('en', 'store name', 'en.information.name');
//---vi---
viNLP.addDocument('vi', 'tên là gì', 'vi.information.name');
viNLP.addDocument('vi', 'tên cửa hàng', 'vi.information.name');

//*******time*******
//---en---
enNLP.addDocument('en', 'open', 'en.information.time');
enNLP.addDocument('en', 'close', 'en.information.time');
//---vi---
viNLP.addDocument('vi', 'mở cửa', 'vi.information.time');
viNLP.addDocument('vi', 'đóng cửa', 'vi.information.time');

//*******about*******
//---en---
enNLP.addDocument('en', 'introduce store', 'en.information.about');
enNLP.addDocument('en', 'about store', 'en.information.about');
//---vi---
viNLP.addDocument('vi', 'giới thiệu', 'vi.information.about');
viNLP.addDocument('vi', 'cửa hàng có gì', 'vi.information.about');

//---------------------------------------------------------------------//
// Train also the NLG
//-----------------bye-----------------
//---en---
enNLP.addAnswer('en', 'en.greetings.bye', 'Till next time!');
enNLP.addAnswer('en', 'en.greetings.bye', 'See you soon!');
enNLP.addAnswer('en', 'en.greetings.bye', 'See you again!');
enNLP.addAnswer('en', 'en.greetings.bye', 'Bye Bye!');
//---vi---
viNLP.addAnswer('vi', 'vi.greetings.bye', 'Hẹp gặp lại!');
viNLP.addAnswer('vi', 'vi.greetings.bye', 'Tạm biệt!');
viNLP.addAnswer('vi', 'vi.greetings.bye', 'Chào tạm biệt!');
viNLP.addAnswer('vi', 'vi.greetings.bye', 'Bye Bye!');


//-----------------hello-----------------
//---en---
enNLP.addAnswer('en', 'en.greetings.hello', 'Hey there!');
enNLP.addAnswer('en', 'en.greetings.hello', 'How can I help you?');
enNLP.addAnswer('en', 'en.greetings.hello', 'Hello!');
enNLP.addAnswer('en', 'en.greetings.hello', 'Hi!');
enNLP.addAnswer('en', 'en.greetings.hello', 'Nice to meet you!');
//---vi---
viNLP.addAnswer('vi', 'vi.greetings.hello', 'Xin chào!');
viNLP.addAnswer('vi', 'vi.greetings.hello', 'Rất vui được gặp bạn!');
viNLP.addAnswer('vi', 'vi.greetings.hello', 'Chào bạn!');
viNLP.addAnswer('vi', 'vi.greetings.hello', 'Tôi có thể giúp được gì cho bạn?');
viNLP.addAnswer('vi', 'vi.greetings.hello', 'Hân hạnh được phục vụ quý khách!');


//-----------------information-----------------
//*******address*******
//---en---
enNLP.addAnswer('en', 'en.information.address', "The shop's address is 19 Nguyen Huu Tho Street, Tan Phong Ward, District 7, Ho Chi Minh City, Vietnam.");
enNLP.addAnswer('en', 'en.information.address', "The shop's location is 19 Nguyen Huu Tho Street, Tan Phong Ward, District 7, Ho Chi Minh City, Vietnam.");
enNLP.addAnswer('en', 'en.information.address', 'The location of the store can be found at 19 Nguyen Huu Tho Street, Tan Phong Ward, District 7, Ho Chi Minh City, Vietnam.');
enNLP.addAnswer('en', 'en.information.address', 'The store is situated at 19 Nguyen Huu Tho Street, Tan Phong Ward, District 7, in Ho Chi Minh City, Vietnam.');
//---vi---
viNLP.addAnswer('vi', 'vi.information.address', 'Địa chỉ của cửa hàng là số 19 đường Nguyễn Hữu Thọ, phường Tân Phong, quận 7, thành phố Hồ Chí Minh, Việt Nam.');
viNLP.addAnswer('vi', 'vi.information.address', 'Địa điểm của cửa hàng nằm tại số 19 đường Nguyễn Hữu Thọ, phường Tân Phong, quận 7, thành phố Hồ Chí Minh, Việt Nam.');

//*******name*******
//---en---
enNLP.addAnswer('en', 'en.information.name', 'Ton Duc Thang store.');
enNLP.addAnswer('en', 'en.information.name', 'Store name Ton Duc Thang.');
//---vi---
viNLP.addAnswer('vi', 'vi.information.name', 'Cửa hàng Tôn Đức Thắng.');
viNLP.addAnswer('vi', 'vi.information.name', 'Cửa hàng có tên là Tôn Đức Thắng.');

//*******time*******
//---en---
enNLP.addAnswer('en', 'en.information.time', 'Open from 7:00 am and Close at 11:59 pm.');
enNLP.addAnswer('en', 'en.information.time', 'Open at 7:00 am and Close at 11:59 pm.');
//---vi---
viNLP.addAnswer('vi', 'vi.information.time', 'Mở cửa từ 7:00 sáng đến 11:59 pm');
viNLP.addAnswer('vi', 'vi.information.time', 'Mở cửa vào 7:00 và đóng cửa vào lúc 11:59 pm.');

//*******about*******
//---en---
enNLP.addAnswer('en', 'en.information.about', 'At Ton Duc Thang convenience store, we provide a variety of items, from food, beverages, household appliances, to personal necessities, ensuring to meet all of our customers needs. We always update and add new products, ensuring a variety of choices for our customers. In particular, at Ton Duc Thang convenience store, we are committed to the quality of products and services. The items at the store are thoroughly checked for quality and origin, ensuring safety for the health of customers. Our staff is always enthusiastic and attentive, ready to assist you in the shopping process.');
//---vi---
viNLP.addAnswer('vi', 'vi.information.about', 'Tại cửa hàng tiện lợi Tôn Đức Thắng, chúng tôi cung cấp đa dạng các mặt hàng, từ thực phẩm, đồ uống, đồ gia dụng, đến nhu yếu phẩm cá nhân, đảm bảo đáp ứng mọi nhu cầu của quý khách hàng. Chúng tôi luôn cập nhật và bổ sung các sản phẩm mới, đảm bảo đa dạng lựa chọn cho quý khách hàng. Đặc biệt, tại cửa hàng tiện lợi Tôn Đức Thắng, chúng tôi cam kết về chất lượng sản phẩm và dịch vụ. Các mặt hàng tại cửa hàng đều được kiểm tra kỹ lưỡng về chất lượng và nguồn gốc, đảm bảo an toàn cho sức khỏe của quý khách hàng. Đội ngũ nhân viên của chúng tôi luôn nhiệt tình và chu đáo, sẵn sàng hỗ trợ quý khách hàng trong quá trình mua sắm.');





//------------------------------------------------------------
(async() => {
    await enNLP.train();
    await viNLP.train();
})();
module.exports = {
    enNLP: enNLP,
    viNLP: viNLP
}