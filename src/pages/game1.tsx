import { Card, Col, Row, Progress, message, Modal, Statistic, InputNumber, Form, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react'
const { Countdown } = Statistic;


import './game1.less'


class PickGame extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            source: new Array()
        };
    };

    componentDidMount() {
    }

    init(values: any) {
        //根据长宽选择
        let width = values.width;
        let heigth = values.heigth;
        let timeset = values.timeset;

        let source = new Array();


        //总个数
        let count = width * heigth

        if ((count % 2) != 0) {
            message.warning('卡牌数量不为偶数')
            return
        }

        let image_source = new Array();
        for (let i = 1; i <= count / 2; i++) {
            image_source.push(i);
            image_source.push(i);
        }


        for (let i = 0; i < heigth; i++) {
            source[i] = new Array()
            for (let j = 0; j < width; j++) {
                //生成图片索引
                let image_source_index = Math.floor((Math.random() * image_source.length))
                let image_index = image_source[image_source_index]
                image_source.splice(image_source_index, 1)

                //图片信息
                let item = {
                    i: i,
                    j: j,
                    index: width * i + j,
                    status: 'init',
                    image_index: image_index
                }
                //放入数组
                source[i][j] = item;
            }
        }
        this.setState({
            source: source,
            width: width,
            height: heigth,
            lock: false,
            preImage: undefined,
            remainTime: timeset,
            toatlTime: timeset,
            deadline: Date.now() + timeset * 1000,
            isStart: true
        })
    }

    imageOnClick = (index: number, e: any) => {

        let width = this.state.width;
        let heigth = this.state.height;
        let source = this.state.source;
        let lock = this.state.lock;
        let pre_image = this.state.pre_image;
        let that = this;

        if (lock) return
        let i = Math.floor(index / width)
        let j = index - width * i

        if (pre_image != undefined && pre_image.image_index == source[i][j].image_index && pre_image.index != source[i][j].index) {
            source[i][j].status = 'done'
            source[pre_image.i][pre_image.j].status = 'done'
            that.setState({ source: source, pre_image: undefined })
            console.log('匹配成功')
            let isFinsh = true;
            source.forEach((row: any) => {
                row.forEach((col: any) => {
                    if (col.status != 'done') {
                        isFinsh = false;
                    }
                });
            });

            if (isFinsh) {
                Modal.success({
                    content: '恭喜成功！',
                    onOk() { that.setState({ isStart: false }) }
                });
            }
        }
        //上次未选择
        else if (pre_image == undefined) {
            source[i][j].status = 'click'
            pre_image = source[i][j];
            that.setState({ pre_image: pre_image })
            console.log('选中')
        }
        //点击了已匹配
        else if (source[i][j].status == 'done') {
            console.log('已匹配')
        }
        else {
            console.log('等待重置')
            source[i][j].status = 'click'
            that.setState({ source: source, lock: true })

            setTimeout(function () {
                console.log(pre_image, source[i][j])
                //和之前选择不同，则重置
                if (pre_image != undefined && pre_image.image_index != source[i][j].image_index) {
                    if (source[i][j].status != 'done') {
                        source[i][j].status = 'init'
                    }
                    if (source[pre_image.i][pre_image.j].status != 'done') {
                        source[pre_image.i][pre_image.j].status = 'init'
                    }
                    that.setState({ source: source, pre_image: undefined, lock: false })
                    console.log('重置')
                }
            }, 1000);
        }


    }

    onTimeout = () => {
        let that = this;
        Modal.warning({
            content: '时间耗尽，请重新开始',
            onOk() { that.setState({ isStart: false }) }
        });
    }


    onTimeChange = (time) => {
        let remainTime = Math.floor(time / 1000)
        if (this.state.remainTime != remainTime) {
            this.setState({ remainTime: remainTime })
        }
    }

    onSet = (values: any) => {
        this.init(values)
    }

    render() {
        let source = this.state.source;
        let toatlTime = this.state.toatlTime;
        let deadline = this.state.deadline;
        let percent = this.state.remainTime / toatlTime * 100;
        let isStart = this.state.isStart;
        return (
            <div className="main-div">

                {isStart ?
                    <div>
                        <Progress style={{ "width": "500px" }} size="small" strokeColor="#52c41a" percent={percent} format={() => ''} />
                        <Countdown title="剩余时间" value={deadline} onFinish={this.onTimeout} onChange={this.onTimeChange} />

                        <div className="card-div">
                            {source.map((row_item: any, index: number) => {
                                return <Row key={index}>
                                    {row_item.map((item: { index: number, status: string, image_index: number }) => {
                                        return <Col key={item.index}>
                                            <Card
                                                onClick={(e) => this.imageOnClick(item.index, e)}
                                                key={item.index}
                                                hoverable
                                                style={{ width: 70, height: 65, margin: 5 }}
                                                cover={item.status != 'init' ? <img style={{ width: 70, height: 65 }} src={require('@/assets/animg/' + item.image_index + '.png')} /> : undefined}
                                            >
                                            </Card>
                                        </Col>
                                    })}
                                </Row>
                            })}
                        </div>
                    </div> :
                    <div>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={this.onSet}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="宽"
                                name="width"
                                initialValue={4}>
                                <InputNumber min={1} max={10} />
                            </Form.Item>

                            <Form.Item
                                label="高"
                                name="heigth"
                                initialValue={4}>
                                <InputNumber min={1} max={10} />
                            </Form.Item>
                            <Form.Item
                                label="时间"
                                name="timeset"
                                initialValue={100}>
                                <InputNumber min={1} max={1000} />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button htmlType="submit" type="primary">开始</Button>
                            </Form.Item>
                        </Form>
                    </div>

                }

            </div>
        );
    }
}

export default PickGame