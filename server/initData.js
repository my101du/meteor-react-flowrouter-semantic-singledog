/**
 * 狗
 */
var dogsCount = Dogs.find().count();
console.log("dogsCount", dogsCount);
if (dogsCount === 0) {
    console.log("0 dogs, need fill test data");
    dogId_1 = Dogs.insert({
        userId: '1',
        nickName: '霸王别挤',
        mobile: '18173782161',
        sex: 'male',
        age: '22',
        job: '公务员',
        like: '运动,跑步',
        avatar: 'Aaron Adams.ico',
        figure: '1',
        personality: '1',
        followers: []
    });
    dogId_2 = Dogs.insert({
        userId: '2',
        nickName: '轻舞飞扬',
        mobile: '17173782162',
        sex: 'female',
        age: '30',
        job: '教师',
        like: '音乐',
        avatar: 'Cecilia Cheung.ico',
        figure: '2',
        personality: '3',
        followers: [dogId_1]
    });
    dogId_3 = Dogs.insert({
        userId: '3',
        nickName: '哥哥love',
        mobile: '16173782163',
        sex: 'male',
        age: '21',
        job: '士兵',
        like: '军事,历史',
        avatar: 'Eileen Tung.ico',
        figure: '3',
        personality: '2',
        followers: [dogId_2, dogId_1]
    });
    dogId_4 = Dogs.insert({
        userId: '4',
        nickName: '红色连衣裙',
        mobile: '15173782164',
        sex: 'female',
        age: '25',
        job: '护士',
        like: '逛街',
        avatar: 'Geuong.ico',
        figure: '4',
        personality: '5',
        followers: [dogId_3, dogId_1]
    });
    dogId_5 = Dogs.insert({
        userId: '5',
        nickName: '一把hard锤子',
        mobile: '14173782165',
        sex: 'male',
        age: '27',
        job: '包工头',
        like: '旅游,爬山',
        avatar: 'Helina Tam.ico',
        figure: '1',
        personality: '4',
        followers: [dogId_1, dogId_2, dogId_4]
    });
    dogId_6 = Dogs.insert({
        userId: '6',
        nickName: '水晶妖精',
        mobile: '13173782166',
        sex: 'female',
        age: '25',
        job: '模特',
        like: '吃货',
        avatar: 'Vivian Lai.ico',
        figure: '2',
        personality: '2',
        followers: [dogId_2, dogId_3]
    });
    dogId_7 = Dogs.insert({
        userId: '7',
        nickName: 'sunrise笑容',
        mobile: '12173782167',
        sex: 'female',
        age: '28',
        job: '大学生',
        like: '健身,美容',
        avatar: 'Liza Richardson.ico',
        figure: '5',
        personality: '3',
        followers: [dogId_4]
    });
    dogId_8 = Dogs.insert({
        userId: '8',
        nickName: '坚强石头',
        mobile: '18973782168',
        sex: 'male',
        age: '32',
        job: '健身教练',
        like: '唱歌',
        avatar: 'Mark Frauenfelder.ico',
        figure: '6',
        personality: '4',
        followers: [dogId_7]
    });
    dogId_9 = Dogs.insert({
        userId: '9',
        nickName: '玫瑰花瓣88',
        mobile: '18873782169',
        sex: 'female',
        age: '24',
        job: '主播',
        like: '睡觉,飙车',
        avatar: 'Michelle Lee.ico',
        figure: '5',
        personality: '6',
        followers: [dogId_7, dogId_8, dogId_1]
    });
}


/**
 * 狗窝
 */
var nestsCount = Nests.find().count();
console.log("nestsCount", nestsCount);
if (nestsCount === 0) {
    Nests.insert({
        name: '科技园单身狗俱乐部',
        desc: '我们是一批码农, 长在青青草原上',
        users: [dogId_1, dogId_2]
    });
    Nests.insert({
        name: '大长腿妹子',
        desc: '颜值高，身材好，关键还能修电脑',
        users: [dogId_5, dogId_6]
    });
    Nests.insert({
        name: '深大犬只团',
        desc: '好好学习，天天向上，聚集深大的单身狗们',
        users: [dogId_5, dogId_7, dogId_9, dogId_6, dogId_7]
    });
    Nests.insert({
        name: '深圳南山单身贵族',
        desc: '每天在几万平方米的床上醒来，可是我一点都不快乐',
        users: [dogId_4]
    });
    Nests.insert({
        name: '福田单身女教师',
        desc: '下课了到我家来一趟，单独给你补习一下这堂课',
        users: [dogId_2, dogId_3, dogId_4]
    });
    Nests.insert({
        name: '罗湖区小护士',
        desc: '先森，你哪里不舒服？要不要给你打一针啊',
        users: [dogId_9, dogId_8]
    });
    Nests.insert({
        name: '40岁的大叔们',
        desc: '为了事业，我们忙得忘了寻找另外一半，有车有房，一直在等你',
        users: [dogId_2]
    });
}


/**
 * 活动
 */
var eventsCount = Events.find().count();
console.log("eventsCount", eventsCount);
if (eventsCount === 0) {
    Events.insert({
        name: '酷党量贩式KTV 20 人飙歌',
        date: '2015-12-20 下午 13:30',
        address: '福田区华强北路12号',
        desc: '拿起你的麦克风，唱出心中的歌',
        applicants: [dogId_1, dogId_2]
    });
    Events.insert({
        name: '红树林沿海暴走',
        date: '2016-01-08 下午 15:30',
        address: '福田区红树林沿海栈道',
        desc: '可以骑车，可以走路，可以马拉松，形式随便你，只要能坚持下去',
        applicants: [dogId_2, dogId_3, dogId_4, dogId_8]
    });
    Events.insert({
        name: '南山图书馆IT主题聚会',
        date: '2015-12-12 下午 14:00',
        address: '南山区大新地铁站附近',
        desc: '让我们畅想IT行业的未来，讨论最有意思的科技话题',
        applicants: []
    });
    Events.insert({
        name: '周末一起去爬山',
        date: '2016-01-20 上午 13:30',
        address: '罗湖区梧桐山',
        desc: '迎着寒风，顶着小雨，让我们一起征服鹏程第一峰吧',
        applicants: [dogId_4, dogId_5, dogId_6, dogId_7, dogId_9]
    });
}
