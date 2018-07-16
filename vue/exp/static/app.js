/*global jQuery Vue axios iview*/

(function($jq, Vue, axios, iview) {
    $jq(document).ready(function() {
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
        Vue.component('version-form', {
            data: function() {
                return {
                    VersionCounter: 0,
                    ruleinline: {
                        Date: [{
                            validator: function(rule, value, callback) {
                                //console.log(typeof value);

                                if (value.length === 0) {
                                    callback(new Error('Please enter version date'));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur',
                        }, {
                            required: true,
                            message: 'Please fill in version date',
                            trigger: 'blur',
                        }],
                    },
                };
            },
            template: `
                <Form ref="versionTplForm" :model="note" label-position="left" :label-width="60">
                    <Row>
                        <Col span="4">
                            <Button
                                @click="addVersion"
                            >Add Version</Button>
                        </Col>
                    </Row>
                    <Row
                        v-for="(version, index) of note.VersionArr"
                        :key="version.ID"
                    >
                        <Col span="2">
                            <FormItem
                                :label-width="2"
                            >
                            <Input
                                v-model="version.ID"
                            ></Input>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem
                                :label-width="2"
                            >
                            <Input
                                v-model="version.Number"
                            ></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem
                                :prop="'VersionArr.' + index + '.Date'"
                                :rules="ruleinline.Date"
                                :label-width="2"
                            >
                                <Input
                                    v-model="version.Date"
                                ></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            `,
            methods: {
                validateFormData: function() {
                    let name = 'versionTplForm';
                    let result = false;

                    this.$refs[name].validate((valid) => {
                        if (valid === true) {
                            result = true;
                            this.$Message.success('Success!');
                        } else {
                            this.$Message.error('Fail!');
                        }
                    });

                    console.log('4. all done');
                    return result;
                },
                addVersion: function() {
                    console.log('adding new version');
                    console.log(this.note);

                    this.note.VersionArr.push({
                        ID: this.VersionCounter,
                        Number: 'v1.0.' + this.VersionCounter,
                        Date: '',
                    });

                    this.VersionCounter++;
                },
            },
            mounted: function() {
                this.VersionCounter = this.note.VersionArr.length;

                if (this.note.VersionArr.length == 0) {
                    this.addVersion();
                }
            },
            props: ['note'],
        });

        Vue.component('note-list', {
            template: `
                <FormItem>
                    <Row>
                        <Col span="1">
                            <Input v-model="note.ID"></Input>
                        </Col>
                        <Col span="3">
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
                                    v-for="(item, itemIndex) of $root.$data.SelectOptions.Person.ItemNoteLanguage[itemid]"
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
                                ref="noteEditor"
                                v-model.number="note.Editor"
                                @on-change="doSomething2"
                                @change="doSomething3"
                                filterable="filterable"
                                clearable="clearable"
                            >
                                <Option
                                    v-for="(item, itemIndex) of $root.$data.SelectOptions.Person.ItemNoteEditor[note.Language]"
                                    :value="item.ID"
                                    :key="item.ID"
                                    :label="item.Text1"
                                >
                                    <span>{{ item.Text1 }}</span>
                                    <span style="float:right;color:#ccc">{{ item.Text2 }}</span>
                                </Option>
                            </Select>
                        </Col>
                        <Col span="2">
                            <Button
                                @click="$emit('removenotetry', $event)"
                            >rm note</Button>
                        </Col>
                        <Col span="2">
                            <Button
                                @click="openVersionForm"
                            >add ver</Button>
                            <Modal
                                v-model="versionNumberModal"
                                width="800"
                                :closable="false"
                            >
                                <div>
                                    <version-form
                                        ref="versionForm"
                                        :note="note"
                                    ></version-form>
                                </div>
                                <div slot="footer">
                                    <Button @click="cancelVersionFormData">Cancel</Button>
                                    <Button @click="saveVersionFormData">Save</Button>
                                </div>
                            </Modal>
                        </Col>
                    </Row>
                </FormItem>
            `,
            data: function() {
                return {
                    versionNumberModal: false,
                    origVersionArr: [],
                };
            },
            methods: {
                openVersionForm: function() {
                    // Open modal
                    this.versionNumberModal = true;

                    // Save original form data
                    this.origVersionArr = JSON.parse(JSON.stringify(this.note.VersionArr));
                },
                cancelVersionFormData: function() {
                    // Close modal
                    this.versionNumberModal = false;

                    // Restore original form data
                    this.note.VersionArr = this.origVersionArr;
                },
                saveVersionFormData: function() {

                    //console.log(this.$refs);
                    console.clear();
                    console.log('1. Before validateFormData');

                    let result = this.$refs.versionForm.validateFormData();

                    if (result == true) {
                        this.versionNumberModal = false;
                    }

                    console.log('5. After validateFormData');
                    console.log('6. Result: ' + result);
                },
                doSomething1: function() {
                    console.log('inside doSomething1: ' + this.note.Language);

                    //this.note.Editor = 0;

                    this.$refs.noteEditor.clearSingleSelect();
                    //this.$refs.noteEditor.setQuery('');
                },
                doSomething2: function() {
                    console.log('inside doSomething2: ' + this.note.Language);
                },
                doSomething3: function() {
                    console.log('inside doSomething3: ' + this.note.Language);
                },
            },
            watch: {
                'note.Language': function(newVal, oldVal) {
                    if (this.note.Language in this.$root.$data.SelectOptions.Person.ItemNoteEditor) {
                        //this.ItemNoteEditor = this.$root.$data.SelectOptions.Person.ItemNoteEditor[this.note.Language];
                    }

                    //this.note.Editor = 0;

                    //console.log( this.ItemNoteEditor );
                },
            },
            mounted: function() {},
            props: ['note', 'itemid'],
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
                        <Col span="14">
                            <Button
                                @click="addNote($event)"
                            >Add note</Button>
                            <br />
                            <note-list v-for="(note, index) of item.NoteArr"
                                :key="note.ID"
                                :note="note"
                                :itemid="item.ID"
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
            data: function() {
                return {
                    NoteIDCounter: 0,
                };
            },
            watch: {},
            mounted: function() {
                this.NoteIDCounter = this.item.NoteArr.length;
            },
            methods: {
                addNote: function(event) {
                    event.preventDefault();

                    this.item.NoteArr.push({
                        ID: this.NoteIDCounter,
                        Name: 'Note 0',
                        Language: 0,
                        Editor: 0,
                        VersionArr: [],
                    });

                    this.NoteIDCounter++;
                },
                removeNote: function(itemIndex, event) {
                    event.preventDefault();

                    this.item.NoteArr.splice(itemIndex, 1);

                    // Reset ID
                    //for (let i = 0; i < this.item.NoteArr.length; i++) {
                    //    this.item.NoteArr[i].ID = i;
                    //}
                },
            },
            filters: {},
            props: ['item'],
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
            data: function() {
                return {
                    ItemIDCounter: 0,
                };
            },
            methods: {
                AddPersonItem: function(event) {
                    event.preventDefault();

                    this.person.ItemArr.push({
                        ID: this.ItemIDCounter,
                        Name: '',
                        Qty: 0,
                        ColorArr: [],
                        IsActive: 1,
                        NoteArr: [],
                    });

                    this.ItemIDCounter++;
                },
                removeitem: function(index, event, a, b) {
                    event.preventDefault();

                    a;
                    b;

                    this.person.ItemArr.splice(index, 1);

                    // Reset ID
                    //for (let i = 0; i < this.person.ItemArr.length; i++) {
                    //    this.person.ItemArr[i].ID = i;
                    //}
                },
                personSave2: function(e) {
                    e.preventDefault();

                    let _this = this;

                    console.log('saving');
                    console.log(_this.person);

                    _this.$http({
                        method: 'post',
                        url: '/api/personform',
                        data: _this.person,
                    }).then(function(response) {
                        console.log(response.data.result[0].data);
                    }).catch(function(error) {
                        console.log(error);
                    });
                },
            },
            filters: {},
            mounted: function() {
                this.ItemIDCounter = this.person.ItemArr.length;
            },
            props: ['person', 'disableform1', 'disableform2', 'ruleinline'],
        });

        // Global filters
        Vue.filter('pretty', function(value) {
            return JSON.stringify(value, null, 2);
        });

        //
        let Main = {
            data: function() {
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
                                0: [{
                                        ID: 1,
                                        Text1: 'C 1',
                                        Text2: 'CC 1'
                                    },
                                    {
                                        ID: 2,
                                        Text1: 'C 2',
                                        Text2: 'CC 2'
                                    },
                                ],
                                1: [{
                                        ID: 1,
                                        Text1: 'PHP 1',
                                        Text2: 'PHPP 1'
                                    },
                                    {
                                        ID: 2,
                                        Text1: 'PHP 2',
                                        Text2: 'PHPP 2'
                                    },
                                    {
                                        ID: 3,
                                        Text1: 'PHP 3',
                                        Text2: 'PHPP 3'
                                    },
                                ],
                                2: [{
                                        ID: 1,
                                        Text1: 'Go 1',
                                        Text2: 'Goo 1'
                                    },
                                    {
                                        ID: 2,
                                        Text1: 'Go 2',
                                        Text2: 'Goo 2'
                                    },
                                    {
                                        ID: 3,
                                        Text1: 'Go 3',
                                        Text2: 'Goo 3'
                                    },
                                    {
                                        ID: 4,
                                        Text1: 'Go 4',
                                        Text2: 'Goo 4'
                                    },
                                ],
                            },
                            ItemNoteEditor: {
                                0: [{
                                    ID: 1,
                                    Text1: 'NotYet 1',
                                    Text2: 'NotYet 1'
                                }, ],
                                1: [{
                                        ID: 0,
                                        Text1: 'NotYet 0',
                                        Text2: 'NotYet 0'
                                    },
                                    {
                                        ID: 1,
                                        Text1: 'Vim 1',
                                        Text2: 'Vimm 1'
                                    },
                                    {
                                        ID: 2,
                                        Text1: 'Vim 2',
                                        Text2: 'Vimm 2'
                                    },
                                ],
                                2: [{
                                        ID: 0,
                                        Text1: 'NotYet 0',
                                        Text2: 'NotYet 0'
                                    },
                                    {
                                        ID: 1,
                                        Text1: 'EditPlus 1',
                                        Text2: 'EditPlus 1'
                                    },
                                    {
                                        ID: 2,
                                        Text1: 'EditPlus 2',
                                        Text2: 'EditPlus 2'
                                    },
                                ],
                                3: [{
                                        ID: 0,
                                        Text1: 'NotYet 0',
                                        Text2: 'NotYet 0'
                                    },
                                    {
                                        ID: 1,
                                        Text1: 'VS 1',
                                        Text2: 'VS 1'
                                    },
                                    {
                                        ID: 2,
                                        Text1: 'VS 2',
                                        Text2: 'VS 2'
                                    },
                                    {
                                        ID: 3,
                                        Text1: 'VS 3',
                                        Text2: 'VS 3'
                                    },
                                ],
                                4: [{
                                        ID: 0,
                                        Text1: 'NotYet 0',
                                        Text2: 'NotYet 0'
                                    },
                                    {
                                        ID: 1,
                                        Text1: 'Atom 1',
                                        Text2: 'Atom 1'
                                    },
                                    {
                                        ID: 2,
                                        Text1: 'Atom 2',
                                        Text2: 'Atom 2'
                                    },
                                    {
                                        ID: 3,
                                        Text1: 'Atom 3',
                                        Text2: 'Atom 3'
                                    },
                                ],
                            },
                        },
                    },
                    ruleInline: {
                        Name: [{
                            validator: function(rule, value, callback) {
                                if (value.length === 0) {
                                    callback(new Error('Please enter your nameee again'));
                                } else {
                                    callback();
                                }
                            },
                            trigger: 'blur',
                        }, {
                            required: true,
                            message: 'Please fill in the user name',
                            trigger: 'blur',
                        }],
                        password: [{
                            required: true,
                            message: 'Please fill in the password.',
                            trigger: 'blur',
                        }, {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur',
                        }],
                    },
                    html: null,
                };
            },
            methods: {
                show: function() {
                    this.visible = true;
                },
            },
            filters: {},
            render: function(createElement) {
                if (!this.html) {
                    return createElement('div', 'Loading...');
                } else {
                    return this.html();
                }
            },
            mounted: function() {
                let html = `
                <div>
                    <Icon type="social-tux" size="60"></Icon>
                    <Icon type="social-freebsd-devil" size="60"></Icon>
                    <Icon type="thumbsup" size="60"></Icon>

                    <Button @click="show">Click me!</Button>
                    <Modal v-model="visible" title="Welcome">Welcome to iView</Modal>

                    <br />
                    <order-form
                        :person="Person"
                        :disableform1="DisableForm1"
                        :disableform2="DisableForm2"
                        :ruleinline="ruleInline"
                    >
                    </order-form>
                </div>
                `;

                this.html = Vue.compile(html).render;
            },
        };

        let MainComponent = Vue.extend(Main);
        let vm = new MainComponent();

        setTimeout(function() {
            let data = {
                Person: {
                    Name: 'Bot',
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
                                VersionArr: [{
                                    ID: 0,
                                    Number: 'v1.0.0',
                                    Date: '2018-07-03',
                                }],
                            }, {
                                ID: 1,
                                Name: 'Note 1-1',
                                Language: 1,
                                Editor: 2,
                                VersionArr: [],
                            }, {
                                ID: 2,
                                Name: 'Note 1-2',
                                Language: 0,
                                Editor: 0,
                                VersionArr: [],
                            }],
                        },
                    ]
                }
            };

            vm.$data.Person = data.Person;
            vm.$mount('#app');
        }, 500);
    }
})(jQuery, Vue, axios, iview);
