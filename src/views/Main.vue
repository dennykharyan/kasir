<template>
    <div id="main">
        <b-container class="mt-5">
            <b-row>
                <b-col md="10" offset-md="1">
                    <b-card border-variant="light" header="Detail Belanja" align="center">
                        <b-card-body>
                            <b-row>
                                <b-form>
                                    <b-form-group
                                        label-cols-md="4"
                                        label="Kode Kasir">
                                        <b-form-input list="kode-kasir" v-model="kasirCode"></b-form-input>
                                        <b-form-datalist id="kode-kasir" :options="kasir"></b-form-datalist>
                                    </b-form-group>

                                    <b-form-group
                                        label-cols-md="4"
                                        label="Nama Kasir">
                                        <b-form-input v-model="kasirName" disabled type="text"></b-form-input>
                                    </b-form-group>

                                    <b-form-group
                                        label-cols-md="4"
                                        label="Waktu">
                                        <input v-model="date" type="text" class="form-control" readonly />
                                    </b-form-group>
                                </b-form>
                            </b-row>

                            <b-row>
                                <table class="table table-bordered" id="table">
                                    <thead>
                                        <tr>
                                            <th>Kode Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Harga</th>
                                            <th>Qty</th>
                                            <th>Jumlah</th>
                                            <th><b-button variant="primary" @click="add">+</b-button></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, d) in tableData" :key="d">
                                            <td>
                                                <b-form-input :list="`kode-barang-'${d}'`" v-model="data.kode" @change="getProductName(data)"></b-form-input>
                                                <b-datalist :id="`kode-barang-'${d}'`" :options="kodeBarang"></b-datalist>
                                            </td>
                                            <td>
                                                <b-form-input readonly v-model="data.nama"></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input readonly v-model="data.harga"></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input v-model="data.qty" @change="jumlah(data)"></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input readonly v-model="data.jumlah"></b-form-input>
                                            </td>
                                            <td scope="row">
                                                <b-button variant="danger" @click="remove(d, data)">-</b-button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="5" class="text-right align-middle">Total</td>
                                            <td>
                                                <b-form-input v-model="total" readonly></b-form-input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="5" class="text-right align-middle">Jumlah Bayar</td>
                                            <td>
                                                <b-form-input v-model="bayar" @change="calculate()"></b-form-input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="5" class="text-right align-middle">Kembali</td>
                                            <td>
                                                <b-form-input v-model="kembali" readonly></b-form-input>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-row>
                            
                            <b-row>
                                <b-col md="2" offset-md="10">
                                    <b-button variant="primary" class="w-100 no-print" @click="cetak()">Cetak</b-button>
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            kasirCode: '',
            kasirName: '',
            date: '',
            kasir: [
                { 
                    value: 'K034', 
                    text: 'Andi Kurniawan' 
                },
                { 
                    value: 'K035', 
                    text: 'Andi' 
                },
                { 
                    value: 'K036', 
                    text: 'Kurniawan' 
                },
            ],
            row: 1,
            kodeBarang: [
                {
                    value: 'B0293',
                    kode: 'B0293',
                    nama: 'Sabun',
                    text: 'Sabun',
                    harga: 12000,
                    qty: 1,
                    jumlah: 12000
                },
                {
                    value: 'B7187',
                    kode: 'B7187',
                    nama: 'Shampo',
                    text: 'Shampo',
                    harga: 13000,
                    qty: 1,
                    jumlah: 13000
                },
                {
                    value: 'B7102',
                    kode: 'B7102',
                    nama: 'Pasta Gigi',
                    text: 'Pasta Gigi',
                    harga: 7000,
                    qty: 1,
                    jumlah: 7000
                }
            ],
            tableData: [
                {
                    kode: '',
                    nama: '',
                    harga: 0,
                    qty: 0,
                    jumlah: 0
                }
            ],
            total: 0,
            bayar: 0,
            kembali: 0
        }
    },
    mounted() {
        
    },
    methods: {
        setNama: function () {
            for (var i = 0; i < this.kasir.length; i++) {
                if (this.kasir[i].value == this.kasirCode) {
                    this.kasirName = this.kasir[i].text;
                }
            }
            
            this.date = new Date().toISOString().substr(0, 19).replace('T', ' ');
        },
        add: function () {
            this.tableData.push({
                kode: '',
                nama: '',
                harga: 0,
                qty: 0,
                jumlah: 0
            });

            this.row++;
        },
        getProductName: function (data) {
            for (var i = 0; i < this.kodeBarang.length; i++) {
                if (this.kodeBarang[i].kode == data.kode) {
                    data.nama = this.kodeBarang[i].nama;
                    data.harga = this.kodeBarang[i].harga;
                    data.qty = 1;
                    data.jumlah = data.qty * data.harga;
                }
            }

            this.calculate();
        },
        jumlah: function (data) {
            let total = parseFloat(data.harga) * parseFloat(data.qty);

            if (!isNaN(total)) {
                data.jumlah = total;
            }

            this.calculate();
        },
        calculate: function () {
            let subtotal = this.tableData.reduce(function (sum, product) {
                let lineTotal = parseFloat(product.jumlah);

                if (!isNaN(lineTotal)) {
                    return sum + lineTotal;
                }
            }, 0);

            this.total = subtotal.toFixed();
            
            if (!isNaN(this.bayar)) {
                if (this.bayar < 1) {
                    this.kembali = 0;
                } else {
                    this.kembali = Number(this.bayar) - Number(this.total);
                }
            } else {
                this.kembali = 0;
            }
        },
        remove: function (index, data) {
            let id = this.tableData.indexOf(data);

            if (id > -1) {
                this.tableData.splice(id, 1);
            } 
            
            this.calculate();
        },
        cetak: function () {
            window.print();
        }
    },
    watch: {
        kasirCode: function () {
            this.setNama(this.kasirCode);
        }
    },
    computed: {
        
    }
}
</script>

<style>
@media print {
    .no-print {
        visibility: hidden !important;
    }
}
</style>