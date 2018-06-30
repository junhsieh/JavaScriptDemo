/*global jQuery Vue axios iview*/

(function ($jq, Vue, axios, iview) {
    $jq(document).ready(function () {
        InitVue();
    });

    function InitVue() {
        //
        //document.querySelector('#app').innerHTML = AppHTML();

        //
        iview.lang('en-US');

        Vue.prototype.$http = axios;

        Vue.config.debug = true;

        //
        Vue.component('note-list', {
            template: `
                <FormItem>
                    <Row>
                        <Col span="2">
                            <Input v-model="note.ID"></Input>
                        </Col>
                        <Col span="4">
                            <Input v-model="note.Name"></Input>
                        </Col>
                        <Col span="5">
                            <Select
                                v-model.number="note.Language"
                                @on-change="doSomething1"
                                filterable="filterable"
                                clearable="clearable"
                            >
                                <Option
                                    v-for="item in $root.$data.SelectOptions.Person.ItemNoteLanguage[note.ID]"
                                    :value="item.ID"
                                    :key="item.ID"
                                    :label="item.Text1"
                                >
                                    <span>{{ item.Text1 }}</span>
                                    <span style="float:right;color:#ccc">{{ item.Text2 }}</span>
                                </Option>
                            </Select>
                        </Col>
                        <Col span="5">
                            <Select
                                v-model.number="note.Editor"
                                @on-change="doSomething2"
                                @change="doSomething3"
                                filterable="filterable"
                                clearable="clearable"
                                remote="remote"
                                :remote-method="remoteMethod1"
                                :loading="loading1"
                            >
                                <Option
                                    v-for="item in asdf2"
                                    :value="item.ID"
                                    :key="item.ID"
                                    :label="item.Text1"
                                >
                                    <span>{{ item.Text1 }}</span>
                                    <span style="float:right;color:#ccc">{{ item.Text2 }}</span>
                                </Option>
                            </Select>
                        </Col>
                        <Col span="8">
                            <Button
                                @click="$emit('removenotetry', $event)"
                            >Remove note</Button>
                        </Col>
                    </Row>
                </FormItem>
            `,
            data: function () {
                return {
                    //myshow: true,
                    //ItemNoteLanguage: [],
                    //ItemNoteEditor: [],
                    asdf2: [],
                    loading1: false,
                };
            },
            methods: {
                remoteMethod1: function () {
                    this.loading1 = true;
                    this.asdf2 = this.$root.$data.SelectOptions.Person.ItemNoteEditor[this.note.Language];
                    this.loading1 = false;
                },
                doSomething1: function () {
                    console.log('inside doSomething1: ' + this.note.Language);

                    this.loading1 = true;
                    this.asdf2 = this.$root.$data.SelectOptions.Person.ItemNoteEditor[this.note.Language];
                    this.loading1 = false;
                    this.note.Editor = 0;

                    //this.$set(asdf2, this.$root.$data.SelectOptions.Person.ItemNoteEditor[this.note.Language]);
                    //this.asdf2.$set();

                    //this.$nextTick(function () {
                    //    this.asdf2 = this.$root.$data.SelectOptions.Person.ItemNoteEditor[this.note.Language];
                    //    console.log('done');
                    //    this.note.Editor = 0;
                    //});

                    //this.myshow = false;

                    //this.$nextTick(() => {

                    //    this.myshow = true;
                    //    console.log('re-render start');

                    //    this.$nextTick(() => {
                    //        console.log('re-render end');

                    //        this.note.Editor = 0;
                    //    })
                    //})
                },
                doSomething2: function () {
                    console.log('inside doSomething2: ' + this.note.Language);
                },
                doSomething3: function () {
                    console.log('inside doSomething3: ' + this.note.Language);
                },
                ItemNoteLanguage2222: function () {
                    if (this.note.ID in this.$root.$data.SelectOptions.Person.ItemNoteLanguage) {
                        return this.$root.$data.SelectOptions.Person.ItemNoteLanguage[this.note.ID];
                    }

                    return [
                        { ID: 0, Text1: 'not yet 0', Text2: 'not yet 0' },
                    ];
                },
                ItemNoteEditor2222: function () {
                    console.log('Triggered: ' + this.note.Language);

                    if (this.note.Language in this.$root.$data.SelectOptions.Person.ItemNoteEditor) {
                        return this.$root.$data.SelectOptions.Person.ItemNoteEditor[this.note.Language];
                    }

                    return [
                        { ID: 0, Text1: 'not yet 0', Text2: 'not yet 0' },
                    ];
                },
            },
            watch: {
                'note.Language': function (newVal, oldVal) {
                    if (this.note.Language in this.$root.$data.SelectOptions.Person.ItemNoteEditor) {
                        //this.ItemNoteEditor = this.$root.$data.SelectOptions.Person.ItemNoteEditor[this.note.Language];
                    }

                    //this.note.Editor = 0;

                    //console.log( this.ItemNoteEditor );
                },
            },
            mounted: function () {
                this.asdf2 = this.asdf;
            },
            props: ['note', 'asdf'],
        });

        Vue.component('order-list', {
            template: `
                <FormItem>
                    <Row>
                        <Col span="1">
                            <Input v-model.number="item.ID"></Input>
                        </Col>
                        <Col span="2">
                            <Input v-model="item.Name"></Input>
                        </Col>
                        <Col span="1">
                            <Input v-model.number="item.Qty"></Input>
                        </Col>
                        <Col span="2" style="left-margin: 1em;">
                            <CheckboxGroup v-model="item.ColorArr">
                                <Checkbox label="white">White</Checkbox>
                                <br /><Checkbox label="yellow">Yellow</Checkbox>
                                <br /><Checkbox label="red">Red</Checkbox>
                            </CheckboxGroup>
                        </Col>
                        <Col span="2">
                            <RadioGroup v-model="item.IsActive">
                                <Radio :label="1">
                                    <Icon type="social-apple"></Icon>
                                    <span>Active</span>
                                </Radio>
                                <br /><Radio :label="0">
                                    <Icon type="social-android"></Icon>
                                    <span>Inactive</span>
                                </Radio>
                            </RadioGroup>
                        </Col>
                        <Col span="10">
                            <Button
                                @click="addNote($event, itemindex)"
                            >Add note</Button>
                            <br />
                            <note-list v-for="(note, index) of item.NoteArr"
                                :key="note.ID"
                                :note="note"
                                :asdf="$root.$data.SelectOptions.Person.ItemNoteEditor[note.Language]"
                                @removenotetry="removeNote(index, ...arguments)"
                            ></note-list>
                        </Col>
                        <Col span="1">
                            <Button
                                @click="$emit('removeitemtry', $event, 'gan a', 'gan b')"
                            >Remove</Button>
                        </Col>
                    </Row>
                </FormItem>
            `,
            watch: {},
            methods: {
                addNote: function (event, itemindex) {
                    event.preventDefault();

                    let l = this.$root.$data.Person.ItemArr[itemindex].NoteArr.length;
                    this.$root.$data.Person.ItemArr[itemindex].NoteArr.push({
                        ID: l,
                        Name: 'Note 0',
                        Language: 0,
                        Editor: 0,
                    });
                },
                removeNote: function (itemIndex, event) {
                    event.preventDefault();

                    this.item.NoteArr.splice(itemIndex, 1);

                    // Reset ID
                    for (let i = 0; i < this.item.NoteArr.length; i++) {
                        this.item.NoteArr[i].ID = i;
                    }
                },
            },
            filters: {},
            props: ['item', 'itemindex'],
        });

        Vue.component('order-form', {
            template: `
                <Form ref="orderForm" :model="person" :rules="ruleinline" label-position="left" :label-width="60">
                    <FormItem prop="Name" label="Name">
                        <Row>
                            <Col span="12">
                                <Input v-model="person.Name" :disabled="disableform1 || disableform2">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </Col>
                        </Row>
                    </FormItem>

                    <order-list v-for="(item, index) of person.ItemArr"
                        :key="item.ID"
                        :item="item"
                        :itemindex="index"
                        @removeitemtry="removeitem(index, ...arguments)"
                    ></order-list>

                    <FormItem>
                        <Row>
                            <Col span="4">
                                <Button type="dashed" @click.prevent="AddPersonItem" icon="plus-round">Add item</Button>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem>
                        <Row>
                            <Col span="4">
                                <Button type="dashed" @click.prevent="personSave2" icon="plus-round">Save</Button>
                            </Col>
                        </Row>
                    </FormItem>

                    <pre>{{ person | pretty }}</pre>
                </Form>
            `,
            methods: {
                AddPersonItem: function (event) {
                    event.preventDefault();

                    this.person.ItemArr.push({
                        ID: this.person.ItemArr.length,
                        Name: '',
                        Qty: 0,
                        ColorArr: [],
                        IsActive: 1,
                        NoteArr: [],
                    });
                },
                removeitem: function (index, event, a, b) {
                    event.preventDefault();

                    a;
                    b;

                    this.person.ItemArr.splice(index, 1);

                    // Reset ID
                    for (let i = 0; i < this.person.ItemArr.length; i++) {
                        this.person.ItemArr[i].ID = i;
                    }
                },
                personSave2: function (e) {
                    e.preventDefault();

                    let _this = this;

                    console.log('saving');
                    console.log(_this.person);

                    _this.$http.post('/api/personform', _this.person)
                        .then(function (response) {
                            console.log(response.data.result[0].data);
                        }).catch(function (error) {
                            console.log(error);
                        });
                },
            },
            filters: {},
            props: ['person', 'disableform1', 'disableform2', 'ruleinline'],
        });

        // Global filters
        Vue.filter('pretty', function (value) {
            return JSON.stringify(value, null, 2);
        });

        //
        let Main = {
            data: function () {
                return {
                    DisableForm1: false,
                    DisableForm2: false,
                    visible: false,
                    Person: {
                        Name: '',
                        ItemArr: [],
                    },
                    SelectOptions: {
                        Person: {
                            ItemNoteLanguage: {
                                0: [
                                    { ID: 1, Text1: 'C 1', Text2: 'CC 1' },
                                    { ID: 2, Text1: 'C 2', Text2: 'CC 2' },
                                ],
                                1: [
                                    { ID: 1, Text1: 'PHP 1', Text2: 'PHPP 1' },
                                    { ID: 2, Text1: 'PHP 2', Text2: 'PHPP 2' },
                                ],
                                2: [
                                    { ID: 1, Text1: 'Go 1', Text2: 'Goo 1' },
                                    { ID: 2, Text1: 'Go 2', Text2: 'Goo 2' },
                                ],
                            },
                            ItemNoteEditor: {
                                0: [
                                    { ID: 1, Text1: 'NotYet 1', Text2: 'NotYet 1' },
                                    { ID: 2, Text1: 'NotYet 2', Text2: 'NotYet 2' },
                                ],
                                1: [
                                    { ID: 0, Text1: 'NotYet 0', Text2: 'NotYet 0' },
                                    { ID: 1, Text1: 'Vim 1', Text2: 'Vimm 1' },
                                    { ID: 2, Text1: 'Vim 2', Text2: 'Vimm 2' },
                                ],
                                2: [
                                    { ID: 0, Text1: 'NotYet 0', Text2: 'NotYet 0' },
                                    { ID: 1, Text1: 'Notepad 1', Text2: 'Notepadd 1' },
                                    { ID: 2, Text1: 'Notepad 2', Text2: 'Notepadd 2' },
                                ],
                            },
                        },
                    },
                    ruleInline: {
                        Name: [{
                            required: true,
                            message: 'Please fill in the user name',
                            trigger: 'blur'
                        }],
                        password: [{
                            required: true,
                            message: 'Please fill in the password.',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur'
                        }
                        ]
                    },
                    html: null,
                };
            },
            methods: {
                show: function () {
                    this.visible = true;
                },
            },
            filters: {},
            render: function (createElement) {
                if (!this.html) {
                    return createElement('div', 'Loading...');
                } else {
                    return this.html();
                }
            },
            mounted: function () {
                let _this = this;
                let html = `
                <div>
                    <Icon type="social-tux" size="60"></Icon>
                    <Icon type="social-freebsd-devil" size="60"></Icon>
                    <Icon type="thumbsup" size="60"></Icon>

                    <Button @click="show">Click me!</Button>
                    <Modal v-model="visible" title="Welcome">Welcome to iView</Modal>

                    <br />
                    <order-form :person="Person" :disableform1="DisableForm1" :disableform2="DisableForm2" :ruleinline="ruleInline"></order-form>
                </div>
                `;

                _this.html = Vue.compile(html).render;
            },
        };

        let MainComponent = Vue.extend(Main);
        let vm = new MainComponent().$mount('#app');

        setTimeout(function () {
            let data = {
                Person: {
                    Name: 'Jun',
                    ItemArr: [{
                        ID: 0,
                        Name: 'Apple',
                        Qty: 5,
                        ColorArr: ['white', 'red'],
                        IsActive: 1,
                        NoteArr: [],
                    },
                    {
                        ID: 1,
                        Name: 'Banana',
                        Qty: 6,
                        ColorArr: ['yellow', 'white'],
                        IsActive: 0,
                        NoteArr: [{
                            ID: 0,
                            Name: 'Note 1-0',
                            Language: 2,
                            Editor: 1,
                        }, {
                            ID: 1,
                            Name: 'Note 1-1',
                            Language: 1,
                            Editor: 2,
                        }, {
                            ID: 2,
                            Name: 'Note 1-2',
                            Language: 0,
                            Editor: 0,
                        }],
                    },
                    ]
                }
            };

            vm.$data.Person = data.Person;
        }, 500);
    }
})(jQuery, Vue, axios, iview);


