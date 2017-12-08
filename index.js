/*
 * @Author: hunaisong 
 * @Date: 2017-12-06 16:54:56 
 * @Last Modified by: hunaisong
 * @Last Modified time: 2017-12-08 16:01:52
 */
var List = new Vue({
    el: '#list',
    data: {
        cates: [
            { id: 0, des: '推荐' },
            { id: 1, des: '母婴' },
            { id: 2, des: '鞋包饰品' },
            { id: 3, des: '食品' },
            { id: 4, des: '数码家电' },
            { id: 5, des: '居家百货' }
        ],
        filters: [
            { name: '综合排序', method: 'comprehensiveRank', id: 0 },
            { name: '销量优先', method: 'sumRank', id: 1 },
            { name: '价格', method: 'priceRank', id: 2 },
        ],
        /**
         * type:
         * 推荐，所有数据
         * 母婴：1
         * 鞋包饰品：2
         * 食品：3
         * 数码家电：4
         * 居家百货：5
         */
        goods: [{
            id: 1001,
            name: 'Beats EP头戴式耳机',
            price: 558,
            type: 4,
            stock: 128,
            sales: 1872,
            img: 'http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg'
        }, {
            id: 1002,
            name: '雀巢（Nestle）高钙成人奶粉',
            price: 60,
            type: 3,
            stock: 5,
            sales: 2374,
            img: 'http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp'
        }, {
            id: 1003,
            name: '煎炒烹炸一锅多用',
            price: 216,
            type: 5,
            stock: 2,
            sales: 351,
            ishot: true,
            img: 'http://gw.alicdn.com/tps/TB19OfQRXXXXXbmXXXXL6TaGpXX_760x760q90s150.jpg_.webp'
        }, {
            id: 1004,
            name: 'ANNE KLEIN 潮流经典美式轻奢',
            price: 585,
            type: 2,
            stock: 465,
            sales: 8191,
            img: 'http://gw.alicdn.com/tps/TB1l5psQVXXXXcXaXXXL6TaGpXX_760x760q90s150.jpg_.webp'
        }, {
            id: 1005,
            name: '乐高EV3机器人积木玩具',
            price: 3099,
            type: 1,
            stock: 154,
            sales: 165,
            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t6490/168/1052550216/653858/9eef28d1/594922a8Nc3afa743.jpg!q50.jpg'
        }, {
            id: 1006,
            name: '全球购 路易威登（Louis Vuitton）新款女士LV印花手袋 M41112',
            price: 10967,
            type: 2,
            stock: 12,
            sales: 6,
            img: 'https://m.360buyimg.com/n1/s220x220_jfs/t1429/17/1007119837/464370/310392f4/55b5e5bfN75daf703.png!q70.jpg'
        }, {
            id: 1007,
            name: 'Kindle Paperwhite3 黑色经典版电纸书',
            price: 805,
            type: 4,
            stock: 3,
            sales: 395,
            img: 'http://img12.360buyimg.com/n1/s528x528_jfs/t4954/76/635213328/51972/ec4a3c3c/58e5f717N4031d162.jpg!q70.jpg'
        }, {
            id: 1008,
            name: 'DELSEY 男士双肩背包',
            price: 269,
            type: 2,
            stock: 18,
            sales: 69,
            ishot: true,
            img: 'http://gw.alicdn.com/tps/LB1HL0mQVXXXXbzXVXXXXXXXXXX.png'
        }, {
            id: 1009,
            name: '荷兰 天赋力 Herobaby 婴儿配方奶粉 4段 1岁以上700g',
            price: 89,
            type: 1,
            stock: 36,
            sales: 1895,
            img: 'http://m.360buyimg.com/babel/s330x330_jfs/t4597/175/4364374663/125149/4fbbaf21/590d4f5aN0467dc26.jpg!q50.jpg.webp'
        }, {
            id: 1010,
            name: '【全球购】越南acecook河粉牛肉河粉特产 速食即食方便面粉丝 牛肉河粉米粉65克*5袋',
            price: 19.9,
            type: 3,
            stock: 353,
            sales: 3041,
            ishot: true,
            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t3169/228/5426689121/95568/d463e211/586dbf56N37fcd503.jpg!q50.jpg'
        }, {
            id: 1011,
            name: '正品FENDI/芬迪女包钱包女长款 百搭真皮钱夹 女士小怪兽手拿包',
            price: 3580,
            type: 2,
            stock: 5,
            sales: 18,
            img: 'http://img.alicdn.com/imgextra/i3/TB16avCQXXXXXcsXpXXXXXXXXXX_!!0-item_pic.jpg_400x400q60s30.jpg_.webp'
        }],
        // 种类下标
        cateIndex: 0,
        // 过滤条件下标
        filterIndex: 0,
        // 是否升序
        isAsce: false,
        // 商品列表
        list: [],
    },
    methods: {
        /**
         * 切换商品种类
         * @param {Number} index 种类下标
         * 
         */
        changeCate: function(index) {
            this.cateIndex = index;
            // 切换分类时候，重置过滤器到综合排序
            this.filterIndex = 0;
            this.setList();
        },
        /**
         * 设置商品列表
         */
        setList: function() {
            var index = this.cateIndex;
            this.list = this.goods.filter((item) =>
                index === 0 ? item : item.type === index
            )
        },
        /**
         * 综合排序
         */
        comprehensiveRank: function() {
            console.log('综合排序');
        },
        /**
         * 销量排序
         */
        sumRank: function() {
            console.log('销量优先');
            this.list.sort(this.compare('sales'));
        },
        /**
         * 价格排序
         */
        priceRank: function() {
            console.log('价格');
            this.isAsce = !this.isAsce;
            var type = this.isAsce ? 'asce' : 'desc';
            console.log(this.isAsce);
            this.list.sort(this.compare('price', type))
        },
        /**
         * 排序方法
         * @param {Function} method 具体排序方法
         * @param {Number} index  排序下标
         * 
         */
        sortBy: function(method, index) {
            this.filterIndex = index;
            this[method]();
            // 点击其他排序时候，重置价格排序状态
            (method !== 'priceRank') && (this.isAsce = false);
        },
        /**
         * 
         * 比较器
         * @param {Property} prop 
         * @param {string} type 
         * @returns 
         */
        compare: function(prop, type) {
            var flag1, flag2;
            // 默认开启降序排列
            type = type || 'desc'
            // 降序排列，多的在前
            if (type === 'desc') {
                flag1 = -1;
                flag2 = 1;
                // 升序排列，少的在前
            } else if (type === 'asce') {
                flag1 = 1;
                flag2 = -1;
            }
            return function(obj1, obj2) {
                var value1 = obj1[prop];
                var value2 = obj2[prop];
                if (value1 > value2) {
                    return flag1;
                } else if (value1 < value2) {
                    return flag2;
                } else {
                    return 0;
                }
            }
        },
        // 加入购物车
        addToCart: function(good) {
            // console.log(good)
            var alreadyIndex = Cart.cartList.findIndex((item) => {
                return good.id === item.id;
            });
            // 如果没有，就新增
            if (alreadyIndex === -1) {
                Cart.cartList.push(good);
                // length不是动态的，所以每次都需要判断一下，控制是否全选
                if (Cart.selectedNum !== Cart.cartList.length) {
                    Cart.allCheck = false;
                }
                var currentIndex = Cart.cartList.length - 1;
                // 同时设置一些能用得到的状态
                Cart.$set(Cart.cartList[currentIndex], 'quantity', 1);
                Cart.$set(Cart.cartList[currentIndex], 'checked', false);
                Cart.$set(Cart.cartList[currentIndex], 'subTotal', good.price);
            } else {
                // 证明商品已经存在，每次点击加入，都会+1；
                var alreadyGood = Cart.cartList[alreadyIndex];
                var stock = alreadyGood.stock;
                var quantity = alreadyGood.quantity;
                if (quantity < stock) {
                    Cart.$set(alreadyGood, 'quantity', ++alreadyGood.quantity);
                    Cart.$set(alreadyGood, 'subTotal', alreadyGood.quantity * alreadyGood.price)
                } else {
                    return;
                }
            }
        }
    },
    mounted() {
        this.setList();
    }
})

var Cart = new Vue({
    el: '#cart',
    data: {
        cartList: [],
        isEdite: true,
        allCheck: false,
        // 被选中商品的个数
        selectedNum: 0
    },
    methods: {
        // 切换完成与编辑
        toggleEdite: function() {
            this.isEdite = !this.isEdite;
        },
        // 单件商品选择与否
        selectGood: function(good) {
            good.checked = !good.checked;
            good.checked ? ++this.selectedNum : --this.selectedNum;
            // 设置全选状态
            this.selectedNum === this.cartList.length ? this.allCheck = true : this.allCheck = false;
        },
        // 全选
        selectAll: function() {
            this.allCheck = !this.allCheck;
            this.cartList.forEach((good) => {
                // 全选状态
                if (this.allCheck) {
                    good.checked = true;
                    // 同时设置一下selectedNum
                    this.selectedNum = this.cartList.length;
                } else {
                    // 取消全选
                    good.checked = false;
                    this.selectedNum = 0;
                }
            });
        },
        changeQuantity: function(isAdd, good) {
            var stock = good.stock;
            var quantity = good.quantity;
            var price = good.price;
            if (isAdd) {
                if (good.quantity < stock) {
                    this.$set(good, 'quantity', ++quantity);
                    this.$set(good, 'subTotal', quantity * price);
                } else {
                    alert('库存不足');
                }
            } else {
                this.$set(good, 'quantity', --quantity);
                this.$set(good, 'subTotal', quantity * price);
                if (quantity < 1) {
                    this.$set(good, 'quantity', 1);
                    this.$set(good, 'subTotal', quantity * price);
                }
            }
        },
        deleteGood:function () {
            var cartList = this.cartList;
            this.cartList = cartList.filter((good) => {
                return good.checked === false;
            })
        }
    },
    computed: {
        totalQuantity: function() {
            var total = 0;
            var selectedList = this.cartList.filter((good) => {
                return good.checked === true;
            })
            console.log(selectedList)
            selectedList.forEach((item) => {
                total += item.quantity;
            })
            return total;
        },
        totalPrice:function () {
            var total = 0;
            var selectedList = this.cartList.filter((good) => {
                return good.checked === true;
            })
            console.log(selectedList)
            selectedList.forEach((item) => {
                total += item.subTotal;
            })
            return total;
        }
    }
})